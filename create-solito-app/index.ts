#!/usr/bin/env node

// inspired by https://github.com/vercel/next.js/blob/0355e5f63f87db489f36db8d814958cb4c2b828b/packages/create-next-app/helpers/examples.ts#L71
import * as PackageManager from '@expo/package-manager'
import chalk from 'chalk'
import Commander from 'commander'
import fs, { createWriteStream } from 'fs'
import got from 'got'
import { tmpdir } from 'os'
import path, { join } from 'path'
import prompts from 'prompts'
import { Stream } from 'stream'
import tar from 'tar'
import { promisify } from 'util'
import validateProjectName from 'validate-npm-package-name'

import packageJson from './package.json'
const pipeline = promisify(Stream.pipeline)

type RepoInfo = {
  username: string
  name: string
  branch: string
  filePath: string
}

let projectPath: string = ''

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(
    `${chalk.green('<project-directory>')} [options]
  
Example usage:

${chalk.blueBright(`npx ${packageJson.name} twitter-clone`)}`
  )
  .action((name) => {
    projectPath = name
  })
  .option(
    '--use-npm',
    `
  Explicitly tell the CLI to bootstrap the app using npm
`
  )
  //   .option(
  //     '--use-pnpm',
  //     `
  //   Explicitly tell the CLI to bootstrap the app using pnpm
  // `
  //   )
  .option(
    `-t, --template <template>`,
    'Options are `blank`, `with-tailwind`, `with-custom-font`. The default is `blank`'
  )
  .option(
    '--branch <branch>',
    'The branch of the Solito repo to use for the template. Defaults to "master"'
  )
  .allowUnknownOption()
  .parse(process.argv)

const packageManager = program.useNpm
  ? 'npm'
  : program.usePnpm
  ? 'pnpm'
  : 'yarn'

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `solito-csa-example.temp-${Date.now()}`)
  await pipeline(got.stream(url), createWriteStream(tempFile))
  return tempFile
}

async function downloadAndExtractExample(
  root: string,
  name = 'blank',
  branch = 'master'
): Promise<void> {
  if (name === '__internal-testing-retry') {
    throw new Error('This is an internal example for testing the CLI.')
  }

  console.log(chalk.green(`Downloading template from the ${branch} branch...`))

  const tempFile = await downloadTar(
    `https://codeload.github.com/nandorojo/solito/tar.gz/${branch}`
  )

  // const result = await pipeline(
  //   got.stream('https://codeload.github.com/nandorojo/solito/tar.gz/master'),
  //   tar.extract({ cwd: root, strip: 3 }, [
  //     `solito-master/example-monorepos/${name}`,
  //   ])
  // )

  // return result
  await tar.x({
    file: tempFile,
    cwd: root,
    strip: 3,
    filter: (p) => p.includes(`solito-${branch}/example-monorepos/${name}/`),
  })

  fs.unlinkSync(tempFile)
}

async function run() {
  console.log(chalk.bold('🧑‍🎤 Creating solito app...'))
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }
  if (!projectPath) {
    const res = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-solito-app',
      validate: (name) => {
        const validation = validateNpmName(path.basename(path.resolve(name)))
        if (validation.valid) {
          return true
        }
        return 'Invalid project name: ' + validation.problems![0]
      },
    })

    if (typeof res.path === 'string') {
      projectPath = res.path.trim()
    }
  }

  if (!projectPath) {
    console.log()
    console.log('Please specify the project directory:')
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    )
    console.log()
    console.log('For example:')
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-solito-app')}`
    )
    console.log()
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    )
    process.exit(1)
  }

  const resolvedProjectPath = path.resolve(process.cwd(), projectPath)
  const projectName = path.basename(resolvedProjectPath)

  const { valid, problems } = validateNpmName(projectName)
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    )

    problems!.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`))
    process.exit(1)
  }

  if (fs.existsSync(resolvedProjectPath)) {
    console.log()
    console.log(
      chalk.red('🚨 [solito] error'),
      `You tried to make a project called ${chalk.underline(
        chalk.blueBright(projectName)
      )}, but a folder with that name already exists: 
${chalk.blueBright(resolvedProjectPath)}

${chalk.bold(chalk.red(`Please pick a different project name 🥸`))}`
    )
    console.log()
    console.log()
    process.exit(1)
  }
  console.log()
  console.log(
    `Creating a new solito app in ${chalk.blueBright(projectName)}...`
  )
  fs.mkdirSync(resolvedProjectPath)
  console.log(chalk.green(`${projectName} folder created.`))

  try {
    console.log(`Copying template into ${chalk.blueBright(projectName)}...`)
    console.log()
    await downloadAndExtractExample(
      resolvedProjectPath,
      program.template,
      program.branch
    )
    console.log(`Downloaded template into ${chalk.blueBright(projectName)}...`)
    console.log()
    console.log(chalk.green(`${projectName} created!`))
  } catch (e) {
    console.error('[solito] Failed to download example\n\n', e)

    process.exit(1)
  }

  const useYarn = packageManager === 'yarn'

  console.log('Installing packages. This might take a couple of minutes.')
  console.log()
  try {
    await installDependenciesAsync(
      resolvedProjectPath,
      useYarn ? 'yarn' : 'npm'
    )
    // await install(resolvedProjectPath, null, { packageManager, isOnline })
  } catch (e: any) {
    console.error(
      '[solito] error installing node_modules with ' + packageManager + '\n',
      e?.message
    )
    process.exit(1)
  }

  console.log(
    `${chalk.green('Success!')} Created ${projectName} at ${projectPath}`
  )
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}web`))
  console.log('    Starts the development server for the Next.js site.')
  console.log(chalk.cyan(`  ${packageManager} ${useYarn ? '' : 'run '}native`))
  console.log()
  console.log('We suggest that you begin by typing:')
  console.log()
  console.log(chalk.cyan('  cd'), projectName)
  console.log(
    `  ${chalk.cyan(`${packageManager} ${useYarn ? '' : 'run '}web`)}`
  )
  console.log()
}

run()

function validateNpmName(name: string): {
  valid: boolean
  problems?: string[]
} {
  const nameValidation = validateProjectName(name)
  if (nameValidation.validForNewPackages) {
    return { valid: true }
  }

  return {
    valid: false,
    problems: [
      ...(nameValidation.errors || []),
      ...(nameValidation.warnings || []),
    ],
  }
}

export async function installDependenciesAsync(
  projectRoot: string,
  packageManager: 'yarn' | 'npm'
) {
  const options = { cwd: projectRoot }
  if (packageManager === 'yarn') {
    const yarn = new PackageManager.YarnPackageManager(options)
    await yarn.installAsync()
  } else {
    await new PackageManager.NpmPackageManager(options).installAsync()
  }
}

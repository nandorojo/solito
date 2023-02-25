import * as child from 'child_process'
import fs from 'fs'
import path from 'path'
import concurrent from 'concurrently'

const examples = fs.readdirSync(path.join(__dirname, '../example-monorepos'))

console.log('upgrading expo versions in examples...')

concurrent(
  examples.map((example, i) => {
    const appPath = path.join(
      __dirname,
      '../example-monorepos',
      example,
      'apps/expo'
    )
    return {
      command: `yarn --prefer-offline && expo upgrade && cd ../.. && yarn --prefer-offline`,
      name: example,
      prefixColor: ['cyan', 'magenta', 'green', 'yellow', 'red'][i],
      cwd: appPath,
    }
  })
)

// Promise.all([
//   examples.map((example) => {
//     const appPath = path.join(
//       __dirname,
//       '../example-monorepos',
//       example,
//       'apps/expo'
//     )
//     return new Promise(async (resolve) =>
//       resolve(
//         child.execSync(`yarn && expo upgrade`, {
//           cwd: appPath,
//           stdio: 'inherit',
//         })
//       )
//     )
//   }),
// ])

import concurrent from 'concurrently'
import fs from 'fs'
import path from 'path'

const examples = fs.readdirSync(path.join(__dirname, '../example-monorepos'))

console.log('running yarn in example monorepos')

concurrent(
  examples.map((example, i) => {
    const appPath = path.join(__dirname, '../example-monorepos', example)
    return {
      command: `yarn --prefer-offline`,
      name: example,
      prefixColor: ['cyan', 'magenta', 'green', 'yellow', 'red'][i],
      cwd: appPath,
    }
  })
)

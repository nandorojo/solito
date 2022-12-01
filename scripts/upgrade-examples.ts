const child = require('child_process')
import fs from 'fs'
import path from 'path'

const examples = fs.readdirSync(path.join(__dirname, '../example-monorepos'))

console.log('upgrading solito examples...')

Promise.all([
  examples.map((example) => {
    const appPath = path.join(
      __dirname,
      '../example-monorepos',
      example,
      'packages/app'
    )
    return child.exec(`yarn add solito`, {
      cwd: appPath,
    })
  }),
])

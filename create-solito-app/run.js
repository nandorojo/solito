#!/usr/bin/env node
require('child_process').execSync('yarn ts-node index.ts', {
  stdio: 'inherit',
})

// require('ts-node').register({
//   project: './index.ts',
//   config: {
//     compilerOptions: {
//       target: 'es2019',
//       moduleResolution: 'node',
//       strict: true,
//       resolveJsonModule: true,
//       esModuleInterop: true,
//       skipLibCheck: false,
//     },
//   },
// })

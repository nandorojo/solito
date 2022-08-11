# NestJS Example

If you'd like to use a service like [NestJs](https://nestjs.com/), it is completely possible. Be sure to add the following code to your `metro.config.js` file: 

```
const { getDefaultConfig } = require('expo/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(__dirname, '../..')

const config = getDefaultConfig(__dirname)
config.resolver.assetExts.push('cjs')
config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]
config.resolver.blacklistRE = exclusionList([/nestjs\/dist\/.*/])
```

Excluding the `dist` generated directory from Nestjs will avoid the `jest-haste-map` collision error, as documented [here](https://stackoverflow.com/questions/41813211/how-to-make-metro-react-native-packager-ignore-certain-directories).
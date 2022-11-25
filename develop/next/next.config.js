const path = require('path')
const tm = require('next-transpile-modules')([
  'react-native-web',
  '@expo/next-adapter',
  'solito',
])
const { withExpo } = require('@expo/next-adapter')
/**
 * @type {import ('next').NextConfig}
 */
module.exports = withExpo(
  tm({
    webpack(config) {
      // config.resolve.alias['solito$'] = path.resolve(__dirname, '../../build')
      config.resolve.alias['react-native$'] = 'react-native-web'
      return config
    },
    experimental: {
      forceSwcTransforms: true,
    },
  }),
  {
    projectRoot: __dirname,
  }
)

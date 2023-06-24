module.exports = require('@expo/next-adapter').withExpo(
  {
    transpilePackages: [
      'react-native-web',
      'react-native',
      '@expo/next-adapter',
      'solito',
    ],
    reactStrictMode: false,
  },
  {
    projectRoot: __dirname,
  }
)

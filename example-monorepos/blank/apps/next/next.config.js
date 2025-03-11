const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    '@dripsy/core',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
  ],
}

module.exports = withExpo(nextConfig)

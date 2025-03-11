const resolveAlias = {
  // Alias direct react-native imports to react-native-web
  'react-native': 'react-native-web',
  'react-native$': 'react-native-web',
  // Alias internal react-native modules to react-native-web
  'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
    'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
  'react-native/Libraries/vendor/emitter/EventEmitter$':
    'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
  'react-native/Libraries/EventEmitter/NativeEventEmitter$':
    'react-native-web/dist/vendor/react-native/NativeEventEmitter',
}

const resolveExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx']

/**
 * @type {import('next').NextConfig}
 */
const withWebpack = {
  webpack(config) {
    if (!config.resolve) {
      config.resolve = {}
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...resolveAlias,
    }

    config.resolve.extensions = [
      ...resolveExtensions,
      ...(config.resolve?.extensions ?? []),
    ]

    return config
  },
}

/**
 * @type {import('next').NextConfig}
 */
const withTurpopack = {
  experimental: {
    turbo: {
      resolveAlias,
      resolveExtensions: [
        ...resolveExtensions,

        '.js',
        '.mjs',
        '.tsx',
        '.ts',
        '.jsx',
        '.json',
        '.wasm',
      ],
    },
  },
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  transpilePackages: ['solito', 'react-native', 'react-native-reanimated'],

  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
  },

  ...withWebpack,
  ...withTurpopack,
}

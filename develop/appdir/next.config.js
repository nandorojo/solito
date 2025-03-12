const resolveAlias = {
  'react-native': 'react-native-web',
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
  webpack(config, options) {
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
        // we need to merge with the default extensions
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
  transpilePackages: [
    'solito',
    'react-native',
    'react-native-reanimated',
    'moti',
  ],

  compiler: {
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
  },

  ...withWebpack,
  ...withTurpopack,
  typescript: {
    ignoreBuildErrors: true,
  },
}

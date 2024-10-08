module.exports = function (api) {
  api.cache(true)

  // Get the current environment or default to 'development'
  const APP_ENV = process.env.APP_ENV || 'development';

  // Set the path based on the environment
  const envPath = `.env.${APP_ENV}`;

  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: envPath
        },
      ],
      'react-native-reanimated/plugin'
    ],
  }
}
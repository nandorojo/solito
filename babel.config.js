module.exports = function (api) {
  api.cache(true)

  // only used for jest, right?
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
  }
}

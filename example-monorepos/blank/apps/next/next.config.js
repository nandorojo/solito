/** @type {import('next').NextConfig} */
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'dripsy',
  '@dripsy/core',
  'moti',
  'app',
])

const transform = withPlugins([withTM, withFonts, withImages, withExpo])

module.exports = function (name, { defaultConfig }) {
  return transform(name, {
    ...defaultConfig,
    webpack5: true,
    reactStrictMode: true,
  })
}

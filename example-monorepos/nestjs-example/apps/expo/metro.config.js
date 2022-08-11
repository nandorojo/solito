// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
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

module.exports = config

const lint = require('expo-module-scripts/eslintrc.base.js')
module.exports = {
  ...lint,
  rules: {
    ...lint.rules,
    'react/react-in-jsx-scope': 'off',
  },
}

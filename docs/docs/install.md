---
title: Installation
id: install
---

:::tip

Clone/reference the [starter monorepo](/starter) to have Solito pre-installed for you.

:::

## Install the package

```sh
yarn add solito
```

Or, with NPM:

```sh
npm i solito
```

## Next.js setup

You'll need `next-transpile-modules` to run this in your Next.js app.

If you're in a monorepo (which is [recommended](/starter)), start by entering the directory of your Next.js app.

```sh
cd apps/next
```

Next, install the peer dependencies.

```
yarn add -D next-transpile-modules next-compose-plugins next-images next-fonts
```

Then run `yarn` in the root of your monorepo.

Finally, add `solito` to `next-transpile-modules`.

Your `next.config.js` file should look something like this:

```js
const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  'solito',
  // add other packages here that need transpiling, such as moti
])

module.exports = withPlugins([withTM, [withExpo, { projectRoot: __dirname }]], {
  // your next config goes here ...
})
```

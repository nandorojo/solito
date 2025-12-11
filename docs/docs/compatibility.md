---
title: Compatibility
---

Since Solito works with React Native and Next.js, and both upgrade at different rates with their own feature sets, it can be tricky to know what versions are supported.

This document aims to be the official source of truth for what has been tested with Solito. It is possible that other versions outside of this document will work, but they are not officially supported.

Upgrades and other changes will be tracked here as well.

The first version of this doc was created in March 2025, and will be updated on a forward-looking basis.

<!-- TODO ## Next.js 15.4, React 19, Expo SDK 53

- `next` 15.2
- `react` 19
- `turbopack`
- `expo` SDK 52
- `react-compiler`
- `react-native` 0.79.0
- `solito` v4.4
- Next.js App Router
- React Navigation v7 -->

**You will need to set up React 19 in a particular way. For existing Solito apps upgrading, see the [React 19](#react-19) section below.**

For a working example, please reference the [Solito starter monorepo](https://github.com/nandorojo/solito/tree/master/example-monorepos/blank). This has been tested for all of the dependencies above.

### For existing Solito apps

## Next.js 16, React 19, Expo SDK 54

The following combination of versions have been tested together successfully and are used in the starter monorepo:

- `next` 16.x
- `react` 19.1
- `turbopack`
- `expo` SDK 54
- `react-compiler`
- `react-native` 0.81 or 0.82
- `solito` v4 or v5
- Next.js App Router
- React Navigation v7

## Next.js 15.2, React 19, Expo SDK 52

There are a few important steps to get React 19 and Next.js 15 working in a Solito monorepo. Let's outline them below. The primary issue is React 19 support.

The following combination of versions have been tested together successfully and are used in the starter monorepo:

- `next` 15.2
- `react` 19
- `turbopack`
- `expo` SDK 52
- `react-compiler`
- `react-native` 0.76.7
- `solito` v4.4
- Next.js App Router
- React Navigation v7

## React 19 support

Getting React 19 working properly in this monorepo was tricky. If you're referencing this monorepo for your own existing project, here is what you need to do to get it working:

1. `yarn add react@latest react-dom@latest` inside of `apps/next`
2. **Remove** `react` from the `package.json` of `apps/expo` (super important).
3. **Set** `experiments.reactCanary` to `true` in the `app.json` of `apps/expo` (only if you're on SDK 52; 53 doesn't need this step).
4. Run `yarn` and restart everything. You may need to clear `.next` and `.expo`.

To confirm you did this properly, try `yarn why react`. If you see it installed more than once, something is likely going to break.

I recommend using `yarn why ...` for any critical dependencies to ensure you don't have duplicates. [Check out syncpack](https://www.npmjs.com/package/syncpack) to solve this for you elegantly.

If you miss one of those steps, either your website or app will likely not work.

### React Compiler

This monorepo has the React Compiler enabled. There are distinct steps to get it working in Next.js and React Native.

### React Native Web

React Native Web doesn't support React 19 yet, so you might get logs like this. In my experience, it's safe to ignore these.

```sh
../../node_modules/react-native-web/dist/exports/render/index.js
Attempted import error: 'hydrate' is not exported from 'react-dom' (imported as 'domLegacyHydrate').
```

See this [pull request](https://github.com/necolas/react-native-web/pull/2731/files) and this [issue](https://github.com/necolas/react-native-web/issues/2686) to track progress.

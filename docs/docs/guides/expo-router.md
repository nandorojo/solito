---
title: Expo Router
---

Expo recently announced an experimental new routing system which lets you use file-system based routing in native apps. The API is very Next.js- and Remix-esque. I view it as the future of cross-platform routing.

To use Solito with [Expo Router](https://expo.github.io/router/), you'll need to follow their [Getting Started](https://expo.github.io/router/docs/intro#getting-started) guide. These steps should be done inside of `apps/expo` in your Solito project.

Once those steps are done, you're good to go. You can create files inside of `apps/expo/app` to use file system routing on iOS and Android. Solito's `useLink` hook and `Link` component will work like always.

## Starter app

Run this from the terminal to get a Solito + Expo Router project.

```sh
npx create-solito-app@latest -t with-expo-router
```

## In an existing app

To use Expo Router in an existing Solito project, you'll have to remove the `Navigation` provider from `packages/app/providers/index.tsx`. Expo Router will provide this context for you, reducing boilerplate.

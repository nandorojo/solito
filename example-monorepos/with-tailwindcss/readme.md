# Solito + Tailwind CSS Example Monorepo 🕴

```sh
npx create-solito-app@latest my-solito-app with-tailwindcss
```

## ⚡️ Instantly clone & deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnandorojo%2Fsolito%2Ftree%2Fmaster%2Fexample-monorepos%2Fwith-tailwindcss&env=ENABLE_ROOT_PATH_BUILD_CACHE&root-directory=apps/next&envDescription=Set%20this%20environment%20variable%20to%201%20for%20Turborepo%20to%20cache%20your%20node_modules.&envLink=https%3A%2F%2Ftwitter.com%2Fjaredpalmer%2Fstatus%2F1488954563533189124&project-name=solito-app&repo-name=solito-app&demo-title=Solito%20App%20%E2%9A%A1%EF%B8%8F&demo-description=React%20Native%20%2B%20Next.js%20starter%20with%20Solito.%20Made%20by%20Fernando%20Rojo.&demo-url=https%3A%2F%2Fsolito.dev%2Fstarter&demo-image=https%3A%2F%2Fsolito.dev%2Fimg%2Fog.png)

## 🔦 About

This monorepo is a starter for an Expo + Next.js app using [tailwindcss-react-native](https://tailwindcss-react-native.vercel.app) for its styling.

> :warning: This example is using the Preview version of React Native Web 0.18

## 👓 How Tailwind CSS works with Solito

**iOS and Android** apps use Babel to compile the styles and output them as `StyleSheet.create` objects at build-time.

On the other hand, the web app uses Next.js's inbuilt `PostCSS` feature outputs CSS StyleSheets. On Web, `tailwindcss-react-native` uses actual CSS classnames. This is unlike iOS and Android, where styles are compiled into objects.

Since two different compilation methods are used across platforms, the components must be written using the `styled()` higher-order component. Take a look at the [`/packages/app/design`](/packages/app/design) folder to see how components are created with ease.

## 📦 Included packages

- `solito` for cross-platform navigation
- `moti` for animations
- `tailwindcss-react-native` for theming/design (you can bring your own, too)
- Expo SDK 44
- Next.js 12
- React Navigation 6

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
    - `design` your app's design system. organize this as you please.
      - `typography` (components for all the different text styles)
      - `layout` (components for layouts)

You can add other folders inside of `packages/` if you know what you're doing and have a good reason to.

## 🏁 Start the app

- Install dependencies: `yarn`

- Next.js local dev: `yarn web`
  - Runs `yarn next`
- Expo local dev: `yarn native`
  - Runs `expo start`

## 🆕 Add new dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).

## 🎙 About the creator

### Fernando Rojo

Follow Fernando Rojo, creator of `solito`, on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

### Mark Lawlor

Follow Mark Lawlor, creator of `tailwindcss-react-native`, on Twitter: [@mark\_\_lawlor](https://twitter.com/mark__lawlor)

## 🧐 Why use Expo + Next.js?

See my talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>

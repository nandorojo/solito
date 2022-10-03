# Solito with Expo Router Example Monorepo 🕴

```sh
npx create-solito-app@latest -t with-expo-router
```

And just like that, you now have an Expo + Next.js app using Expo Router.

## ⚡️ Instantly clone & deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnandorojo%2Fsolito%2Ftree%2Fmaster%2Fexample-monorepos%2Fwith-expo-router&project-name=solito-app&repo-name=solito-app&demo-title=Solito%20App%20⚡%EF%B8%8F&demo-description=React%20Native%20%2B%20Next.js%20starter%20with%20Solito.%20Made%20by%20Fernando%20Rojo.&demo-url=https%3A%2F%2Fsolito.dev%2Fstarter&demo-image=https%3A%2F%2Fsolito.dev%2Fimg%2Fog.png)

## 🔦 About

This monorepo is a starter for an Expo + Next.js app using [Expo Router](https://expo.github.io/router/) to enable a file-system based routing in native apps. The API is very Next.js- and Remix-esque. I view it as the future of cross-platform routing.

Do note that Expo Router was announced recently (28 Sep 2022) as an **early beta** - full announcement by Evan Bacon from Expo [here](https://blog.expo.dev/rfc-file-system-based-routing-in-react-native-7a35474722a).

## 📦 Included packages

- `solito` for cross-platform navigation
- `moti` for animations
- `dripsy` for theming/design (you can bring your own, too)
- Expo SDK 46
- Next.js 12
- React Navigation 6

## 🗂 Folder layout

- `apps` entry points for each app

  - `expo`
    -  `app` you'll be creating files inside of `apps/expo/app` to use file system routing on iOS and Android.
  - `next`

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)

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

Follow Fernando Rojo on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

## 🧐 Why use Expo + Next.js?

See my talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>

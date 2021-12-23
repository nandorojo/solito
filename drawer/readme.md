# `createNextDrawerNavigator`

```tsx
import { createNextDrawerNavigator } from 'solito/drawer'
```

A fork of the React Navigation `createDrawerNavigator`.

The usage is the essentially identical. It has a few additional props and patterns optimized for Next.js.

On Web, you will `Component` and `pageProps` from `pages/_app.tsx` to the navigator you create. On Native, you will render your tabs like always inside of `App.tsx`, just like any normal React Native app.

## Prerequisites

Be sure that you have configured your `NavigationContainer` with `linking`, so that you can navigate around.

## Usage

### Create a drawer

`./navigation/drawer.tsx`

```tsx
import { createNextDrawerNavigator } from 'solito/drawer'

import HomeStack from 'pages/home'
import ProfileStack from 'pages/profile'

const { Navigator, Screen } = createNextDrawerNavigator()

const Drawer = ({ Component, pageProps }) => {
  return (
    <Navigator Component={Component} pageProps={pageProps}>
      <Screen name="home" component={HomeStack} />
      <Screen name="profile" component={ProfileStack} />
    </Navigator>
  )
}

export { Drawer }
```

### Import your drawer (Web)

`pages/_app.tsx`

```tsx
import { Drawer } from 'navigation/drawer'
import { Providers } from 'providers'

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <Drawer Component={Component} pageProps={pageProps} />
    </Providers>
  )
}
```

### Import your drawer (Native)

On Native, we do the same thing, except that we don't pass `Component` or `pageProps`. The other difference is that we export from `App.tsx`, which is the native entry-point.

`App.tsx`

```tsx
import { Drawer } from 'navigation/drawer'

export default function App() {
  return (
    <Providers>
      <Drawer />
    </Providers>
  )
}
```

## Tree Shaking

Recall the drawer we created in the previous example:

```tsx
import { createNextDrawerNavigator } from 'solito/drawer'

import HomeStack from 'pages/home'
import ProfileStack from 'pages/profile'

const { Navigator, Screen } = createNextDrawerNavigator()

const Drawer = ({ Component, pageProps }) => {
  return (
    <Navigator Component={Component} pageProps={pageProps}>
      <Screen name="home" component={Home} />
      <Screen name="profile" component={ProfileStack} />
    </Navigator>
  )
}

export { Drawer }
```

When it comes to tree shakign, there is an issue with the approach above.

On Web, the drawer will automatically use the `Component` and `pageProps`, rather than the `component` prop passed to the drawer's `Screen` component.

Because of this, there is no need to import our `HomeStack` and `ProfileStack`. If we do, then we lose the benefits of page-specific tree shaking.

```tsx
const Drawer = ({ Component, pageProps }) => {
  return (
    <Navigator Component={Component} pageProps={pageProps}>
      {/* 
        HomeStack and ProfileStack are never used when we have Component and pageProps! 
      */}
      <Screen name="home" component={HomeStack} />
      <Screen name="profile" component={ProfileStack} />
    </Navigator>
  )
}
```

To get around this, we are going to split our `drawer.tsx` file into two files: `drawer.tsx` and `drawer.web.tsx`.

### Split `drawer.tsx` into multiple files

#### `./navigation/drawer.tsx`

This file is the same as our example from above. It will get used on any non-Web platforms.

```tsx
import { createNextDrawerNavigator } from 'solito/drawer'

import { HomeStack } from 'screens/home'
import { ProfileStack } from 'screens/profile'

const { Navigator, Screen } = createNextDrawerNavigator()

const Drawer = ({ Component, pageProps }) => {
  return (
    <Navigator Component={Component} pageProps={pageProps}>
      <Screen name="home" component={HomeStack} />
      <Screen name="profile" component={ProfileStack} />
    </Navigator>
  )
}

export { Drawer }
```

#### `./navigation/drawer.web.tsx`

Because this file ends with `.web.tsx`, it will replace the `drawer.tsx` file on Web.

```tsx
import { createNextDrawerNavigator } from 'solito/drawer'

const { Navigator, Screen } = createNextDrawerNavigator()

const Empty = () => <></>

const Drawer = ({ Component, pageProps }) => {
  return (
    <Navigator Component={Component} pageProps={pageProps}>
      <Screen name="home" component={Empty} />
      <Screen name="profile" component={Empty} />
    </Navigator>
  )
}
```

Notice that we replaced our `component` prop with an `Empty` component. This is because, on Web, our drawer navigator uses the `Component` from `_app.tsx`. By relying on the capitalized `Component` and `pageProps` from Next.js, we can retain Next.js' tree shaking.

## Create your `pages`

Our setup for our native apps is complete. But we have one final piece for

Inside of `pages`, we will create a React Navigation stack for each page.

Just like any normal Next.js app, you will default export your stack, and this will act as the page.

Since our example had `home` and `profile` tabs, let's create a page for each one.

**Each Next.js page will be a stack.**

#### `pages/index.tsx`

```tsx
import { RootScreen } from 'screens/root'

const { Navigator, Screen } = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <Navigator initialRouteName="root">
      <Screen component={RootScreen} name="root" />
    </Navigator>
  )
}
```

#### `pages/profile/index.tsx`

```tsx
import { EditProfileScreen } from 'screens/edit-profile'
import { ProfileScreen } from 'screens/profile'

const { Navigator, Screen } = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Navigator initialRouteName="profile">
      <Screen component={ProfileScreen} name="profile" />
      <Screen component={EditProfileScreen} name="editProfile" />
    </Navigator>
  )
}
```

Since we also have an `editProfile` screen in our `/profile` route, we probably want to point to this screen at `/profile/edit`.

#### `pages/profile/edit.tsx`

```tsx
export { default } from './index'
```

Here, we're exporting the same stack from `./profile`. React Navigation will know which screen to use based on the URL, assuming we properly configure our `linking` config for our `NavigationContainer`.

To maximally optimize for tree shaking and speed, we could use `dynamic` imports in both our `profile` and `profile/edit` pages.

## Tree shake per-stack screen

Here, we will create 2 identical pages. The only difference will be that we will dynamically import the screen that is not screen we are actually rendering based on this route.

For example: you originally navigate to `url.com/profile/edit`, then `EditProfileScreen` will load, but `ProfileScreen` won't be loaded until you click the "back" button.

### Example

Take our `profile` path that we created in the previous step. Let's dynamically import `EditProfileScreen`, since we won't need it when we first visit `/profile`.

#### `pages/profile/index.tsx`

```tsx
import { ProfileScreen } from 'screens/profile'

const EditProfileScreen = dynamic(() =>
  import('screens/edit-profile').then((module) => module.ProfileScreen)
)

const { Navigator, Screen } = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Navigator initialRouteName="profile">
      <Screen component={ProfileScreen} name="profile" />
      <Screen component={EditProfileScreen} name="editProfile" />
    </Navigator>
  )
}
```

To benefit from this approach, use **shallow routing** from `useRouter` or `<Link />` when opening `/profile/edit` from inside of the `ProfileScreen`:

```tsx
// from inside of <ProfileScreen />

const editProfile = () => {
  router.push('/profile/edit', undefined, { shallow: true })
}

// or with a Link
return <Link href="/profile/edit" shallow />
```

#### `pages/profile/edit.tsx`

```tsx
import { EditProfileScreen } from 'screens/edit-profile'

const ProfileScreen = dynamic(() =>
  import('screens/profile').then((module) => module.ProfileScreen)
)

const { Navigator, Screen } = createNativeStackNavigator()

export default function EditProfileStack() {
  return (
    <Navigator initialRouteName="profile">
      <Screen component={ProfileScreen} name="profile" />
      <Screen component={EditProfileScreen} name="editProfile" />
    </Navigator>
  )
}
```

---
title: Create a route
---

Creating a screen with Solito is simple. There are 4 steps:

1. Create a screen component
2. `Web` Export the component from a Next.js page
3. `Native` Render the component in your React Navigation navigator of choice
4. `Native` Add the screen to your React Navigation `linking` config

:::tip What is React Navigation?

React Navigation handles the navigation on the iOS and Android apps. Its API is similar to React Router.

:::

## Starter

To see a full example, I recommend referencing the solito [starter](/starter). You can see the full [code here](https://github.com/nandorojo/solito/tree/master/example-monorepos/blank).

This guide will assume you're editing the starter app.

## Video

For a high-level overview of creating a screen for React Native and Next.js, you can reference the navigation section of Fernando Rojo's Next.js talk:

<div style={{ maxWidth: '100%', overflowX: 'auto' }}>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/0lnbdRweJtA?start=190"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

## Guide

### 1. Create a screen

Create a file at `packages/app/features/settings/screen.tsx`:

```tsx twoslash
import { View, StyleSheet, Text } from 'react-native'

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  text: {
    color: '#fff',
  },
})
```

Here we have a basic `SettingsScreen` component. Since it's inside of `packages/app`, both the native app and website can use it.

This is a common pattern for Solito; created shared UI inside of `packages/`, and then render them in their respective apps.

### 2. Next.js page

In `apps/next/pages/settings.tsx`, export the screen `as default`:

```tsx
export { SettingsScreen as default } from 'app/features/settings/screen'
```

Start the web app and open `localhost:3000/settings` to see your settings screen!

### 3. React Navigation

Now that the `SettingsScreen` works on the website, let's add it to the native app.

In your solito starter, open `packages/app/navigation/native/index.tsx`.

<details>

<summary>It should look like this</summary>

```tsx twoslash
// @filename: ../../features/home/screen.tsx
export declare const HomeScreen: React.FC<{}>

// @filename: ../../features/user/detail-screen.tsx
export declare const UserDetailScreen: React.FC<{}>

// ---cut---
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
```

</details>

#### Render the screen

```tsx twoslash {5, 12, 25-31}
// @filename: ../../features/home/screen.tsx
export declare const HomeScreen: React.FC<{}>

// @filename: ../../features/user/detail-screen.tsx
export declare const UserDetailScreen: React.FC<{}>

// @filename: ../../features/settings/screen.tsx
export declare const SettingsScreen: React.FC<{}>

// ---cut---
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import { SettingsScreen } from '../../features/settings/screen'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  settings: undefined // this screen has no params
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
```

Here we added a `Stack.Screen` as a child of `<Stack.Navigator>`.

The `name` of the screen is `settings`. This name is important and will be used in [step 4](#4-configure-native-linking) when we map a URL to a screen name.

For the `component` prop, we pass the **same `SettingsScreen` component we used for the website**.

### 4. Configure native `linking`

To map a URL to a screen on the native app, we'll use React Navigation's [linking](https://reactnavigation.org/docs/configuring-links/) feature.

#### Add the URL to the config

Open `packages/app/provider/navigation/index.tsx`.

Inside the `linking` prop, point the `settings` screen name to the `/settings` URL path.

```tsx {22}
import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [
            // ...add your URLs here
            Linking.createURL('/'),
          ],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'user-detail': 'user/:id',
              settings: 'settings',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
```

In the `linking.config.screens` field, **the key is the React Navigation screen name, and the value is the URL path.** For example, if we wanted the URL for the `settings` screen to be `/preferences`, we could do this instead:

```json twosalsh {4}
{
  "screens": {
    "home": "",
    "user-detail": "user/:id",
    "settings": "preferences"
  }
}
```

To repeat: the value (i.e. `preferences`) is the URL path. It just ignores the leading slash.

:::tip did you know?

The Expo team is working on bringing [filesystem routing to React Native](https://twitter.com/Baconbrix/status/1560353229241831425), similar to Next.js and Remix.

:::

### 5. Bonus

Now we can link to the `settings` screen from any shared component!

```tsx twoslash
import { TextLink } from 'solito/link'

export function LinkToSettings() {
  return <TextLink href="/settings">Settings</TextLink>
}
```

You can also use `router.push`:

```tsx twoslash
declare const Form: React.FC<{
  onSuccess: () => void
}>

// ---cut---
import { useRouter } from 'solito/router'

export function LinkToSettings() {
  const router = useRouter()

  function linkToSettings() {
    router.push('/settings')
  }

  return <Form onSuccess={linkToSettings} />
}
```

---
title: Firebase Auth
---

# Firebase Auth

Firebase provides an easy and fast way to authenticate users.

In this guide you will learn how to:

1. Sign in users with Firebase Authentication in your Solito apps.
2. Create protected routes, that can only be accessed by signed in users.

We’ll do both of these for our Solito web and native apps. This guide also covers how to setup and install `react-native-firebase` for your native Solito app with EAS build.

## Full Demo:

[Full demo](https://solito-firebase-auth-guide.vercel.app/)

We are taking the beautiful Solito starter project and simply adding authentication on top.

- We will add a sign-in with Google button to our the homepage
- We will make the /user page a protected route, which will only be accesible for signed in users

Simple!

# Guide

:::info REMINDER: Solito's code is for navigating between screen

In Solito we share 100% of the code between screens. Solito’s code is for navigating between
 screens. It’ll be easy to follow this tutorial if you remember that!

:::

## 1. Create and configure a firebase project

1. [Create a new firebase project](https://console.firebase.google.com/u/0/), if you haven’t already.
2. In the sidebar, go to **Build** → **Authentication** and enable authentication for your project.
3. Under **Sign-in method,** click on “Add new provider” and enable Google.

## 2. Install Web & Native Dependencies

Install the following packages in `pagackages/app`.

```bash
cd packages/app
expo install expo-auth-session expo-random firebase

cd ../..
yarn
```

:::info `expo` CLI usage

**We use `expo` CLI to install for both web and native.** `expo install` picks a version of the libraries that are compatible with our expo project, and then simply use our JavaScript package manager (such as yarn / npm) to install them. We are installing packages for our web & native projects in this step.

:::

## 3. Install and Setup `react-native-firebase`

We will use `react-native-firebase` with an Expo custom development client.

:::tip Custom development clients
To learn about custom development clients- check out [This video](https://www.youtube.com/watch?v=_SWalkrP0CA&ab_channel=TCDavis) for a great introduction, as well as the [from expo go to development builds](https://docs.expo.dev/development/introduction/#from-expo-go-to-development-builds) introduction section in Expo’s docs.

:::

### Install dependencies
Install `react-native-firebase` and `expo-build-properties` ([this](https://docs.expo.dev/versions/v45.0.0/sdk/build-properties/) config plugin). We will also install `react-native-google-signin` and use it later.

```bash
cd apps/expo
expo install @react-native-firebase/app expo-build-properties @react-native-google-signin/google-signin

cd ../..
yarn
```

### Configure your `app.json` file (example below):
1. Add the `@react-native-firebase` and `@react-native-google-signin/google-signin` plugins to your `plugins`.
2. configure the [ios.bundleIdentifier](https://docs.expo.dev/versions/latest/config/app/#package) and the [android.packageName](https://docs.expo.dev/versions/latest/config/app/#package) fields to your liking.
3. In the next step we will create the Firebase configuration files for Android and for iOS. Right now, let’s specify in `app.json` the paths to our to-be-created configuration files. They go inside `ios.googleServicesFile` and `android.googleServicesFile`.

```json
// apps/expo/app.json

{
  "expo": {

    "ios": {
      "bundleIdentifier": "com.solito.auth",
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "package": "com.solito.auth",
      "googleServicesFile": "./google-services.json"
    }
    "plugins": [
      ...
      "@react-native-firebase/app",
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

### Create your Firebase **iOS configuration file:**
  1. From the [Firebase console](https://console.firebase.google.com/u/0/project/solitoauthguide/overview), create a new iOS app.  The “Apple Bundle ID” should match the value you’ve just edited in `app.json` in `ios.bundleIdentifier`.
  2. Register the app and download the `GoogleService-Info.plist` file. Place it in `apps/expo`. 
  3. Skip the rest of the setup in the Firebase console.
### Create your Firebase **Android configuration file:**
  1. From the [Firebase console](https://console.firebase.google.com/u/0/project/solitoauthguide/overview), create a new Android app.  The “Android package name” should match the value you’ve just edited in `app.json` in `android.package`.
  2. Register the app and download the `google-services.json` file. Place it in `apps/expo`. 
  3. Skip the rest of the setup in the Firebase console.

## 4. Build with EAS Build

:::tip EAS Build

Learn about EAS build in the [EAS Build Intro Guide](https://docs.expo.dev/build/introduction/).

:::

### Prepare to build

1. Edit your `apps/expo/app.json` fields such as `slug`, `version`, `scheme` and `platforms`, to your liking. Here are the [app.json Introductory guide](https://docs.expo.dev/workflow/configuration/) and the [app.json properties list](https://docs.expo.dev/versions/latest/config/app/).

**Below is a complete `app.json` copy & paste example:**

```json
// apps/expo/app.json

{
  "expo": {
    "name": "solito-auth-guide",
    "slug": "solito-auth-guide",
    "version": "1.0.0",
    "scheme": "solito-auth-guide",
    "platforms": [
      "ios",
      "android"
    ],
    "ios": {
      "bundleIdentifier": "com.solito.auth",
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "package": "com.solito.auth",
      "googleServicesFile": "./google-services.json"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ]
  }
}
```

2. Create an expo account if you haven’t already. You have to have an Expo account in order to use EAS build. A free tier is available. Sign up here: [https://expo.dev/signup](https://expo.dev/signup).
3. Install eas-cli if you haven’t already:

```bash
npm install -g eas-cli
```

4. If it’s your first time installing the eas-cli, run:

```bash
eas-login
```

5. Configure the iOS and Android project for EAS Build.

```bash
cd apps/expo && eas build:configure
```

If you want to learn more, you can read the [configuration process reference](https://docs.expo.dev/build-reference/build-configuration/).

6. Optional: in this tutorial we are [building for an iOS simulator](https://docs.expo.dev/build-reference/simulators/), so let’s add `“simulator” :true` to our `eas.json` config file.

```json
// apps/expo/eas.json

{
  ...

  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },

    ...
  },

  ...
}
```

### Build and run on your iOS simulator

1. Run the following command, and let eas install `expo-dev-client` for you.
Feel free to build for android as well by using `--platform all`.

```bash
cd apps/expo
eas build --profile development --platform ios
```

:::tip EAS Build Profiles

We use the `development` profile from our eas.json file. [Learn more about EAS build profiles](https://docs.expo.dev/build/eas-json/#build-profiles)

:::

2. Wait for the build to complete. When it’s done, [install the build on your simulator](https://docs.expo.dev/build-reference/simulators/#installing-your-build-on-the-simulator).

## 5. Create `userContext.tsx`

We use the same `userContext` for web and native, **but in order sign in users and check whether they are signed in- we will use `react-native-firebase` for native and firebase JS SDK for web**.

### Create `packages/apps/context/userContext.tsx`

:::info

We import `firebase.tsx` file in line 5. We’ll actually have **one Firebase file for each platform** (one for web and one for native), each exporting the same Firebase functions. We’ll create them in the next step.

:::

```tsx
// packages/apps/context/userContext.tsx

import { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "../../firebase/firebase";

type UserT = User | null;

// I ❤️ TS
type UserContextT = {
  user: UserT;
  userInitialized: boolean;
}

export const userContext = createContext<UserContextT>({
  user: null, userInitialized: false,
});

export default function UserProvider({ children }:
  { children: React.ReactNode }) {

  const [user, setUser] = useState<UserT>(null);
  const [userInitialized, setuserInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setuserInitialized(true);
    });

    return unsubscribe;
  }, []);

  return (
    <userContext.Provider value={{user, userInitialized}}>
      {children}
    </userContext.Provider>
  );
}
```

### Create the `firebase.native.tsx` file:

```tsx
// packages/apps/firebase/firebase.native.tsx

import auth, {
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';

const onAuthStateChanged = (listener: FirebaseAuthTypes.AuthListenerCallback) => {
  return auth().onAuthStateChanged(listener);
}

export {
  onAuthStateChanged,
}
```

### Create the `firebase.tsx` file:

1. In the [Firebase console](https://console.firebase.google.com/u/0/project/solitoauthguide/overview), create a new web app.
2. copy the `firebaseConfig` you recieved from the console to the `firebaseConfig` const in the example below.

```tsx
// packages/apps/firebase/firebase.tsx

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  // YOUR CONFIG GOES HERE
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const onAuthStateChangedFunc = (callback: (user: User) => void) => {
  return onAuthStateChanged(auth, callback);
}

export {
  onAuthStateChangedFunc as onAuthStateChanged,
}
```

### Use the user context in your apps:

Import and use `UserProvider` in `provider/index.tsx`:

```tsx
// packages/app/provider/index.tsx

import UserProvider from 'app/context/user-context/user-context'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <UserProvider>
        <Dripsy>{children}</Dripsy>
      </UserProvider>
    </NavigationProvider>
  )
}
```

## 6. Sign in users with the Firebase Google sign-in provider

Let’s start editing our pages! We will:

- Add a sign-in with Google button to our homepage
- Make the /user page a protected route, that can only be accessed by signed in users

Simple!

### Implement a `SignInWithGoogleButton` for native:

Get the `webClientId` from your google-services.json file in `client.oauth_client.client_id property` .Make sure to pick the `client_id` with `client_type: 3`.

Native `SignInWithGoogleButton` example:

```tsx
// packages/app/components/social-login-buttons/SignInWithGoogleButton.native.tsx

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';

GoogleSignin.configure({
  webClientId: // YOUR WEB CLIENT ID GOES HERE
});

export default function SignInWithGoogleButton() {

  const onPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title="Sign in with Google"
      onPress={onPress}
      color="blue"
    />
  )
}
```

Run & test on your simulator by running `expo start --dev-client` from `apps/expo` and open the simulator build on your simulator.

### Implement a `SignInWithGoogleButton` for **web:**
  1. Setup: follow the instructions on [how to set up your web app in the firebase console](https://docs.expo.dev/guides/authentication/#web-apps) from Expo. For the **URIs** and the **Authorized redirect URIs,** use http://localhost:3000 in development. Save the client ID you've just created and use it in the code below. *When deploying your site, add your production URIs*.
  2. Web `SignInWithGoogleButton` example:
    
  ```tsx
  // packages/app/components/social-login-buttons/SignInWithGoogleButton.tsx
  
  import { Button } from 'react-native';
  import * as WebBrowser from 'expo-web-browser';
  import * as Google from 'expo-auth-session/providers/google';
  import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
  import { useEffect } from 'react';
  import { auth } from '../../firebase/firebase';
  
  WebBrowser.maybeCompleteAuthSession();
  
  export default function SignInWithGoogleButton() {
  
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        clientId: // YOUR WEB CLIENT ID GOES HERE
      },
    );
  
    useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential);
      }
    }, [response]);
  
    const onPress = async () => {
      promptAsync();
    }
  
    return (
      <Button
        title="Sign in with Google"
        onPress={onPress}
        color="blue"
        disabled={!request}
      />
    )
  }
  ```
  
Run & test by running `yarn web`.
  
:::info Regarding code duplication

Note- we have some code duplication here, in the simple `<Button />` Component. For simplicty, I didn’t create a shared component or some shared styles which can be used with other React Native Pressables. But you should totally do that.

:::

## 7. Create an `AuthenticatedScreen` component

Users sign in from the homepage. Whenever you wrap a screen with this components, it prompts the users to go back to the homepage and sign in, if they aren’t signed in.

:::tip Regarding redirects

If you’d like, you can just redirect the users right to your sign in page, or display a sign in / sign up modal. Both of them are good practices as well (examples in Discord, Facebook, Linkedin, etc…)

:::

Here is a complete `packages/app/components/AuthenticatedScreen.tsx` example:

```tsx
// packages/app/components/AuthenticatedScreen.tsx

import { userContext } from "app/context/user-context/user-context"
import { useContext } from "react"
import { View, P, ActivityIndicator } from 'dripsy'
import { TextLink } from 'solito/link'

export default function AuthenticatedScreen({ children }) {
  const { user, userInitialized } = useContext(userContext)

  // link to your auth page
  if (userInitialized) {

    if (!user) {
      return (
        <View sx={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <P sx={{textAlign: 'center'}}>
            You are not signed in.
            {'\n'}Please go back to the homepage and sign in.
          </P>

          <TextLink
            textProps={{
              style: {
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 6
              }
            }}
            href="/">
            GO BACK TO HOMEPAGE
          </TextLink>
        </View>
      )
    }

    return <>{children}</>
  } else {
    return (
      <View sx={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator
          color="gray"
          size="large" />
      </View>
    )
  }
}
```

## 8. Edit the user screen

1. Use the `AuthenticatedScreen` component in the user screen.
2. Remove the usage of the `id` param in our code, since we no longer need it.
3. Use the user context.

Full user screen example:

```tsx
// packages/app/features/user/detail-screen.tsx

import AuthenticatedScreen from 'app/components/AuthenticatedScreen'
import { userContext } from 'app/context/user-context/user-context'
import { View, Text } from 'dripsy'
import { useContext } from 'react'
import { TextLink } from 'solito/link'

export function UserDetailScreen() {
  const { user } = useContext(userContext);

  return (
    <AuthenticatedScreen>
      {user &&
        <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            sx={{ textAlign: 'center', mb: 16, fontWeight: 'bold' }}
          >
            Welcome {user.displayName}!
          </Text>

          <TextLink href="/">👈 Go Home</TextLink>
        </View>}
    </AuthenticatedScreen>
  )
}
```

### Update the pages structure
We don’t have a user/[id] page anymore, so let’s change the pages structure. 

```bash
cd apps/next

mv pages/user/\[id\].tsx  pages/user.tsx
rmdir pages/user
```

Let’s reflect this change in the native navigation files:

```tsx
// packages/app/navigation/native/index.tsx

...
const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': undefined
}>()
...
```

```tsx
// packages/app/provider/navigation/index.tsx

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
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'user-detail': 'user',
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

## 9. Edit the homepage

In the homepage, add the `SignInWithGoogleButton` component, and use the `userContext` to conditionally render the sign in button , and you are ready to go!

[Here](https://github.com/omervex/solito-firebase-auth-guide/blob/main/packages/app/features/home/screen.tsx) is a full code example.

## 10. Enjoy

You should now be able to sign in users with Google on native and web.

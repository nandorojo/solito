# Authentication

This doc should give you everything you need to get setup with Firebase Auth.

## Authentication with Firebase

Firebase is a great way to authenticate your app across platforms. You can use `firebase` on Web, and `@react-native-firebase/auth` (which has native code under the hood) on iOS and Android.

### Video

I gave a full demonstration of how to integrate Firebase auth, along with building auth features like protected routes, in my 2022 Next.js Conf talk, starting at about `7:20`.

<iframe width="560" height="315" src="https://www.youtube.com/embed/H1gSWXA3qfw?start=447" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Code Example

To see a full example of using Firebase Auth across React Native and Next.js, reference the [source code](https://github.com/nandorojo/nextjs-conf-22-example/tree/setup/packages/app/features/auth/firebase) for my 2022 Next.js Conf talk.

I also recommend watching the video above to get a start-to-finish idea of how to integrate Firebase auth.

Notice that the code has an [`init.web.ts`](https://github.com/nandorojo/nextjs-conf-22-example/blob/setup/packages/app/features/auth/firebase/init.web.ts) file, and an [`init.native.ts`](https://github.com/nandorojo/nextjs-conf-22-example/blob/setup/packages/app/features/auth/firebase/init.web.ts) file. On iOS and Android, the `.native.ts` file gets imported. On Web, the `.web.ts` file gets imported.

:::tip Platform-based code

React Native uses platform file extensions to let you use different code per platform. You can learn more in the [platform-specific code](/recipes/platform-code) docs.

:::

On iOS And Android, initialize the `@react-native-firebase/auth` package, and re-export our functions which will get consumed by the rest of our app.

`init.native.ts`

```ts
import auth from '@react-native-firebase/auth'
import { Firebase } from './types'

const getIsSignedIn: Firebase['getIsSignedIn'] = () =>
  Boolean(auth().currentUser)

const signOut: Firebase['signOut'] = () => auth().signOut()

const signInAnonymously: Firebase['signInAnonymously'] = async () => {
  return (await auth().signInAnonymously()).user
}

const onAuthStateChanged: Firebase['onAuthStateChanged'] = (callback) => {
  return auth().onAuthStateChanged(callback)
}

const getCurrentUser: Firebase['getCurrentUser'] = () => auth().currentUser

export {
  getIsSignedIn,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  getCurrentUser,
}
```

Next, we'll re-export the same functions in `init.web.ts`, but this time, we'll use the `firebase` package as our import.

`init.web.ts`

```ts
// please note that firebase auth adds about 30kb to your bundle size on Web
import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  browserPopupRedirectResolver,
  browserLocalPersistence,
  signInAnonymously as signInAnonymouslyFirebase,
  onAuthStateChanged as onAuthStateChangedFirebase,
} from 'firebase/auth'
import { Firebase } from './types'

let auth: ReturnType<typeof initializeAuth>

if (typeof window !== 'undefined') {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyAQZ1A-bJMQqjdzNQhRPkbA7swEFnwUS_w',
    authDomain: 'solito-example.firebaseapp.com',
    projectId: 'solito-example',
    storageBucket: 'solito-example.appspot.com',
    messagingSenderId: '960783729432',
    appId: '1:960783729432:web:f2052cb298f0fc7bb3146d',
  })

  auth = initializeAuth(firebaseApp, {
    persistence: browserLocalPersistence,
  })
}

const getIsSignedIn: Firebase['getIsSignedIn'] = () =>
  Boolean(auth?.currentUser)

const signOut: Firebase['signOut'] = () => auth.signOut()

const signInAnonymously: Firebase['signInAnonymously'] = async () => {
  return (await signInAnonymouslyFirebase(auth)).user
}

const onAuthStateChanged: Firebase['onAuthStateChanged'] = (callback) => {
  return onAuthStateChangedFirebase(auth, callback)
}

const getCurrentUser: Firebase['getCurrentUser'] = () => auth.currentUser

export {
  getIsSignedIn,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
}
```

:::tip

Whenever you use a third-party package like Firebase, it's a nice practice to wrap its functions into your own before using them througout your app.

:::

You might notice that both files import a shared `types.ts` file. This is what it looks like:

```ts
// use "import type" to avoid importing firebase code after bundling your app
import type * as firebase from 'firebase/auth'

type User = Pick<firebase.User, 'uid'>

export type Firebase = {
  getIsSignedIn: () => boolean
  signInAnonymously: () => Promise<User>
  signOut: () => Promise<void>
  onAuthStateChanged: (
    callback: (user: { uid: string } | null) => void
  ) => () => void
  getCurrentUser: () => User | null
}
```

Lastly, the [`index.native.ts`](https://github.com/nandorojo/nextjs-conf-22-example/blob/setup/packages/app/features/auth/firebase/index.native.ts) file checks to see if we're using an Expo Dev Client or Expo Go. If you're on Expo Go, it falls back to using Firebase JS, instead of `@react-native-firebase`, using conditional imports.

```ts
import Constants from 'expo-constants'
import { Firebase } from './types'

const isExpoGo = Constants.appOwnership == 'expo'

let exports: Firebase

// here we check if the user has properly set up their native app
// if not, we fall back to firebase JS

if (isExpoGo) {
  exports = require('./init.web')
} else {
  exports = require('./init.native')
}

module.exports = exports
```

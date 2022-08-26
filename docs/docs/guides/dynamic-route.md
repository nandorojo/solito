---
title: Create a dynamic route
---

Next.js lets you create [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) by using bracket syntax in files inside of `pages`.

For example, `apps/next/pages/users/[id].tsx` would let you link to `/users/123` on the website, where the `id` parameter will be `123`.

Creating a dynamic route with Solito is the same as [creating a static route](guides/new-route), except that your `linking` config from [step 4](guides/new-route#4-configure-native-linking) needs to add the dynamic parameter.

## Example

Referencing the [starter monorepo](/starter), open `packages/app/provider/navigation/index.tsx`.

All you need to do is add `'user-detail': 'users/:id'` to your `screens`, assuming you've already followed the steps for [creating a route](guides/new-route):

While Next.js uses `users/[id]` syntax, React Navigation uses `users/:id`.

```tsx {21}
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
              'user-detail': 'users/:id',
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

On the Next.js side, you should have a file at `apps/next/pages/users/[id].tsx` that exports the same screen.

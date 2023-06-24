---
title: App Router Hooks
sidebar_label: solito/navigation
---

> These hooks are available as of Solito v4. They will only work in the Next.js `app` directory on the Web side.

## `useRouter`

```ts
'use client'

import { useRouter } from 'solito/navigation'

export function MyClientComponent() {
  const router = useRouter()

  const onPress = () => {
    router.push('/users/fernando')

    // or replace
    router.replace('/users/fernando')

    // or go back
    router.back()
  }
}
```

## `useParams`

100% feature parity with the [Next.js hook](https://nextjs.org/docs/app/api-reference/functions/use-params).

```tsx
'use client'

import { useParams } from 'solito/navigation'

type Params = { tag: string; item: string }

export default function ExampleClientComponent() {
  const params = useParams<Params>()

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return <></>
}
```

If you want to reuse the types, and you're using a sufficiently-recent version of TypeScript, you can create a custom function with the wrapped type:

```ts
import { useParams } from 'solito/navigation'

type Params = { tag: string; item: string }

export const useShoppingParams = useParam<Params>

// then in your component:
const params = useShoppingParams()
```

## `useSearchParams`

100% feature parity with the [Next.js hook](https://nextjs.org/docs/app/api-reference/functions/use-search-params).

```tsx
'use client'

import { useSearchParams } from 'solito/navigation'

type Params = { search: string }

export default function ExampleClientComponent() {
  const params = useSearchParams<Params>()

  const search = searchParams.get('search')

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'

  return <></>
}
```

## `usePathname`

100% feature parity with the [Next.js hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname).

```ts
'use client'

import { usePathname } from 'solito/navigation'

export default function ExampleClientComponent() {
  const pathname = usePathname()

  // /dashboard?search=hi
  // pathname is /dashboard

  return <>Current pathname: {pathname}</>
}
```

Please keep in mind that this hook may not be perfectly safe to use on iOS / Android if you haven't gone all-in on using links to power navigation for React Navigation. If all screens have a linking config, then this should be safe. Expo Router users can use this hook safely.

I am looking into adding support for `usePathname` for `solito/router` too, allowing its usage in non-App Router folders.

## `useUpdateSearchParams`

A Solito hook to update search parameters.

```tsx
'use client'

type Params = {
  id: string
}

export function App() {
  const updateParams = useUpdateSearchParams<Params>()

  const onPress = () => {
    updateParams({ id: '123' })

    // by default, router.replace is called on Web if you're updating an existing param
    // to override this, see the  webBehavior property
    updateParams({ id: '123' }, { webBehavior: 'push' })
  }
}
```

On native, `setParams` is called. On Web, it either uses `push` or `replace`.

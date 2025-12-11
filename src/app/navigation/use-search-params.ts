import { Platform } from 'react-native'
import { useRoute } from '../../params/use-route'
import useNextSearchParams from './use-next-search-params'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function useSearchParams<Type extends Record<string, string>>() {
  type Returns =
    | (ReadonlyURLSearchParams & {
        get: (key: keyof Type) => string | null
        getAll: (key: keyof Type) => string[]
        has: (key: keyof Type) => boolean
      })
    | undefined
  if (Platform.OS === 'web') {
    return useNextSearchParams() as Returns
  }

  const route = useRoute()

  if (!route) {
    console.error(
      `[useParams] route is undefined. Is your ${Platform.OS} app properly configured for React Navigation?`
    )
  }

  const params = route?.params as Type | undefined

  return useMemo(
    () =>
      params &&
      new URLSearchParams(
        Object.entries(params).map(([key, value]) => {
          if (typeof value === 'string') {
            return [key, value]
          }
          if (typeof value === 'number') {
            return [key, Number(value).toString()]
          }
          if (typeof value === 'boolean') {
            return [key, value]
          }
          return []
        })
      ),
    [params]
  )
}

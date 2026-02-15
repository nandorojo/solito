import { useMemo } from 'react'
import { Platform } from 'react-native'
import { useRoute } from '../../params/use-route'

export function useSearchParams<Type extends Record<string, string>>() {
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

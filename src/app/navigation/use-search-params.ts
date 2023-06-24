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

  if (__DEV__) {
    const nonStringParamValues = Object.entries(params || {})
      .map(([key, value]) => {
        if (typeof value !== 'string') {
          return `${key}: ${JSON.stringify(value)}`
        }
        return undefined
      })
      .filter(Boolean)

    if (nonStringParamValues.length) {
      throw new Error(`[useSearchParams][solito] Error found in the "${
        route?.name ?? 'unknown'
      }" screen (path ${
        route?.path ?? 'unknown'
      }). You used non-string parameters for the following params:
      
${nonStringParamValues.join('\n')}

Due to constraints from Next.js, this is not valid in Solito.  Please refactor your code to use strings for screen parameters.
`)
    }
  }

  return useMemo(() => params && new URLSearchParams(params), [params])
}

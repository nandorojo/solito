import { ReadonlyURLSearchParams } from 'next/navigation'
import useNextSearchParams from './use-next-search-params'

export function useSearchParams<Type extends Record<string, string>>() {
  type Returns =
    | (ReadonlyURLSearchParams & {
        get: (key: keyof Type) => string | null
        getAll: (key: keyof Type) => string[]
        has: (key: keyof Type) => boolean
      })
    | undefined
  return useNextSearchParams() as Returns
}

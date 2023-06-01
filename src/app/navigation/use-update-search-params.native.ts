import { useCallback } from 'react'
import { useRouter } from './use-router'
import { useNavigation } from '../../router/use-navigation'
import { Platform } from 'react-native'
import { UseUpdateSearchParamsReturns } from './use-update-search-params.types'

export default function <
  Type extends Record<string, string> = Record<string, string>
>(): UseUpdateSearchParamsReturns<Type> {
  const navigation = useNavigation()

  return useCallback(
    (params) => {
      navigation?.setParams(params)
    },
    [navigation]
  )
}

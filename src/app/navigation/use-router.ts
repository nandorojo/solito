import { useMemo } from 'react'
import { parseNextPath } from '../../router/parse-next-path'
import { useLinkTo } from '../../router/use-link-to'
import { useNavigation } from '../../router/use-navigation'
import { useNextAppDirRouter } from './use-next-router'

type NextRouterType = NonNullable<ReturnType<typeof useNextAppDirRouter>>

export function useRouter() {
  const linkTo = useLinkTo()
  const navigation = useNavigation()

  const nextRouter = useNextAppDirRouter()

  return useMemo(
    () => ({
      push: (
        url: Parameters<NextRouterType['push']>[0],
        navigateOptions?: Parameters<NextRouterType['push']>[1]
      ) => {
        nextRouter?.push(url, navigateOptions)
      },
      replace: (
        url: Parameters<NextRouterType['replace']>[0],
        navigateOptions?: Parameters<NextRouterType['replace']>[1] & {
          experimental?:
            | {
                nativeBehavior?: undefined
              }
            | {
                nativeBehavior: 'stack-replace'
                isNestedNavigator: boolean
              }
        }
      ) => {
        nextRouter?.replace(url, navigateOptions)
      },
      back: () => {
        nextRouter?.back()
      },
      parseNextPath,
    }),
    [linkTo, navigation]
  )
}

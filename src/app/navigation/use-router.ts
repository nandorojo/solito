import { useContext, useMemo } from 'react'
import { Platform } from 'react-native'

import { parseNextPath } from '../../router/parse-next-path'
import {
  getActionFromState,
  getStateFromPath,
  LinkingContext,
  StackActions,
} from '../../router/replace-helpers'
import { useLinkTo } from '../../router/use-link-to'
import { useNavigation } from '../../router/use-navigation'
import { useNextAppDirRouter } from './use-next-router'

type NextRouterType = NonNullable<ReturnType<typeof useNextAppDirRouter>>

export function useRouter() {
  const linkTo = useLinkTo()
  const navigation = useNavigation()

  const nextRouter = useNextAppDirRouter()

  const linking = useContext(LinkingContext)

  return useMemo(
    () => ({
      push: (
        url: Parameters<NextRouterType['push']>[0],
        navigateOptions?: Parameters<NextRouterType['push']>[1]
      ) => {
        if (Platform.OS === 'web') {
          nextRouter?.push(url, navigateOptions)
        } else {
          const to = parseNextPath(url)

          if (to) {
            linkTo(to)
          }
        }
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
        if (Platform.OS === 'web') {
          nextRouter?.replace(url, navigateOptions)
        } else {
          const to = parseNextPath(url)

          if (to) {
            if (
              navigateOptions?.experimental?.nativeBehavior === 'stack-replace'
            ) {
              if (linking?.options) {
                // custom logic to create a replace() from a URL on native
                // https://github.com/react-navigation/react-navigation/discussions/10517
                const { options } = linking

                const state = options?.getStateFromPath
                  ? options.getStateFromPath(to, options.config)
                  : getStateFromPath(to, options?.config)

                if (state) {
                  const action = getActionFromState(state, options?.config)

                  if (action !== undefined) {
                    if (
                      'payload' in action &&
                      action.payload &&
                      'name' in action.payload &&
                      action.payload.name
                    ) {
                      const { name, params } = action.payload
                      if (
                        navigateOptions?.experimental?.isNestedNavigator &&
                        params &&
                        'screen' in params &&
                        params.screen
                      ) {
                        navigation?.dispatch(
                          StackActions.replace(
                            params.screen,
                            params.params as object | undefined
                          )
                        )
                      } else {
                        navigation?.dispatch(StackActions.replace(name, params))
                      }
                    } else {
                      navigation?.dispatch(action)
                    }
                  } else {
                    navigation?.reset(state)
                  }
                }
              } else {
                // fallback in case the linking context didn't work
                console.warn(`[solito] replace("${to}") faced an issue. You should still see your new screen, but it probably didn't replace the previous one. This may be due to a breaking change in React Navigation. 
  Please open an issue at https://github.com/nandorojo/solito and report how this happened. Thanks!`)
                linkTo(to)
              }
            } else {
              linkTo(to)
            }
          }
        }
      },
      back: () => {
        if (Platform.OS === 'web') {
          nextRouter?.back()
        } else {
          navigation?.goBack()
        }
      },
      parseNextPath,
    }),
    [linkTo, navigation]
  )
}

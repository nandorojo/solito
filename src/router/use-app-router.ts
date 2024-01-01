import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
type NextRouterType =  AppRouterInstance

import { Platform } from 'react-native'
import { useContext, useMemo } from 'react'

import { parseNextAppPath } from './parse-app-next-path'
import {
  getActionFromState,
  getStateFromPath,
  LinkingContext,
  StackActions,
} from './replace-helpers'

import { useLinkTo } from './use-link-to'
import { useNavigation } from './use-navigation'
import {useNextAppRouter} from "./use-next-app-router.web";
import {usePathname} from "next/navigation";

// copied from next/router to appease typescript error
// if we don't manually write this here, then we get some ReturnType error on build
// 🤷‍♂️
interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export function useAppRouter() {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const nextRouter: AppRouterInstance = useNextAppRouter()
  const linking = useContext(LinkingContext)
  const pathName = usePathname()

  return useMemo(
    () => ({
      push: (
        url: Parameters<NextRouterType['push']>[0],
        transitionOptions?: TransitionOptions
      ) => {
        if (Platform.OS === 'web') {
          nextRouter?.push(url, transitionOptions)
        } else {
          const to = parseNextAppPath(url) // get the link to be redirected to in react native.

          if (to) {
            linkTo(to)
          }
        }
      },
      replace: (
        url: Parameters<NextRouterType['replace']>[0],
        as?: Parameters<NextRouterType['replace']>[1],
        transitionOptions?: TransitionOptions & {
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
          nextRouter?.replace(url,  transitionOptions)
        } else {
          const to = parseNextAppPath(url)

          if (to) {
            if (transitionOptions?.experimental?.nativeBehavior === 'stack-replace') {
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
                        transitionOptions?.experimental?.isNestedNavigator &&
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
      parseNextAppPath,
    }),
    [linkTo, navigation]
  )
}

import { StackActions } from '@react-navigation/native'
import type { NextRouter as NextRouterType } from 'next/router'
import { useCallback, useContext } from 'react'

import { getActionFromState } from './get-action-from-state'
import { getStateFromPath } from './get-state-from-path'
import { LinkingContext } from './linking-context'
import { NextRouter } from './next-router'
import { parseNextPath } from './parse-next-path'
import { useLinkTo } from './use-link-to'
import { useNavigation } from './use-navigation'

// copied from next/router to appease typescript error
// if we don't manually write this here, then we get some ReturnType error on build
// 🤷‍♂️
interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

export function useRouter() {
  const linkTo = useLinkTo()
  const navigation = useNavigation()
  const linking = useContext(LinkingContext)

  return {
    push: useCallback(
      (
        url: Parameters<NextRouterType['push']>[0],
        as?: Parameters<NextRouterType['push']>[1],
        transitionOptions?: TransitionOptions
      ) => {
        if (NextRouter?.router) {
          NextRouter.push(url, as, transitionOptions)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      [linkTo]
    ),
    replace: useCallback(
      (
        url: Parameters<NextRouterType['replace']>[0],
        as?: Parameters<NextRouterType['replace']>[1],
        transitionOptions?: TransitionOptions
      ) => {
        if (NextRouter?.router) {
          NextRouter.replace(url, as, transitionOptions)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            if (linking.options) {
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
                    navigation?.dispatch(StackActions.replace(name, params))
                  } else {
                    navigation?.dispatch(action)
                  }
                } else {
                  navigation?.reset(state)
                }
              }
            } else {
              // fallback in case the linking context didn't work
              linkTo(to)
            }
          }
        }
      },
      [linkTo, navigation, linking]
    ),
    back: useCallback(() => {
      if (NextRouter?.router) {
        NextRouter.back()
      } else {
        navigation?.goBack()
      }
    }, [navigation]),
    parseNextPath,
  }
}

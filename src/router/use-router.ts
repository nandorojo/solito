import type { NextRouter as NextRouterType } from 'next/router'
import { Platform } from 'react-native'
import { useMemo } from 'react'

import { StackActions, useNavigation } from './use-navigation'
import { parseNextPath } from './parse-next-path'
import { useLinkTo } from './use-link-to'
import { useNextRouter } from './use-next-router'

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

  const nextRouter = useNextRouter()

  return useMemo(
    () => ({
      push: (
        url: Parameters<NextRouterType['push']>[0],
        as?: Parameters<NextRouterType['push']>[1],
        transitionOptions?: TransitionOptions
      ) => {
        if (Platform.OS === 'web') {
          nextRouter?.push(url, as, transitionOptions)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      replace: (
        url: Parameters<NextRouterType['replace']>[0],
        as?: Parameters<NextRouterType['replace']>[1],
        transitionOptions?: TransitionOptions
      ) => {
        if (Platform.OS === 'web') {
          nextRouter?.replace(url, as, transitionOptions)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            navigation?.dispatch(StackActions.replace(to))
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
    [
      linkTo,
      navigation,
      nextRouter?.push,
      nextRouter?.back,
      nextRouter?.replace,
    ]
  )
}

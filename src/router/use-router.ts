import type { NextRouter as NextRouterType } from 'next/router'
import { useCallback, useMemo } from 'react'

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
  const push = useCallback(
    (
      url: Parameters<NextRouterType['push']>[0],
      as?: Parameters<NextRouterType['push']>[1],
      options?: TransitionOptions
    ) => {
      if (NextRouter?.router) {
        NextRouter.push(url, as, options)
      } else {
        const to = parseNextPath(as || url)

        if (to) {
          linkTo(to)
        }
      }
    },
    [linkTo]
  )

  const replace = useCallback(
    (
      url: Parameters<NextRouterType['replace']>[0],
      as?: Parameters<NextRouterType['replace']>[1],
      options?: TransitionOptions
    ) => {
      if (NextRouter?.router) {
        NextRouter.replace(url, as, options)
      } else {
        const to = parseNextPath(as || url)

        if (to) {
          linkTo(to)
        }
      }
    },
    [linkTo]
  )

  const back = useCallback(() => {
    if (NextRouter?.router) {
      NextRouter.back()
    } else {
      navigation?.goBack()
    }
  }, [navigation])

  return useMemo(() => {
    return {
      push,
      replace,
      back,
      parseNextPath,
    }
  }, [push, replace, back, parseNextPath])
}

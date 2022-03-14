import type { NextRouter } from 'next/router'
import { useCallback } from 'react'

import { parseNextPath } from './parse-next-path'
import { useLinkTo } from './use-link-to'
import { useNavigation } from './use-navigation'
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
  const router = useNextRouter()
  const navigation = useNavigation()

  return {
    push: useCallback(
      (
        url: Parameters<NextRouter['push']>[0],
        as?: Parameters<NextRouter['push']>[1],
        options?: TransitionOptions
      ) => {
        if (router) {
          router.push(url, as, options)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      [linkTo, router?.push]
    ),
    replace: useCallback(
      (
        url: Parameters<NextRouter['replace']>[0],
        as?: Parameters<NextRouter['replace']>[1],
        options?: TransitionOptions
      ) => {
        if (router) {
          router.replace(url, as, options)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      [linkTo, router?.replace]
    ),
    back: useCallback(() => {
      if (router) {
        router.back()
      } else {
        navigation?.goBack()
      }
    }, [router?.back, navigation]),
    parseNextPath,
  }
}

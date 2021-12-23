import { useLinkTo, NavigationContext } from '@react-navigation/native'
import { useRouter as useNextRouter, NextRouter } from 'next/router'
import { useCallback, useContext } from 'react'

import { parseNextPath } from './parse-next-path'

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
  const navigation = useContext(NavigationContext)

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
          // TODO should as be preferred over url here?
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      [linkTo, router]
    ),
    replace: useCallback(
      (
        url: Parameters<NextRouter['replace']>[0],
        as?: Parameters<NextRouter['replace']>[1],
        options?: TransitionOptions
      ) => {
        if (router) {
          // TODO should as be preferred over url here?
          router.replace(url, as, options)
        } else {
          const to = parseNextPath(as || url)

          if (to) {
            linkTo(to)
          }
        }
      },
      [linkTo, router]
    ),
    back: useCallback(() => {
      if (router) {
        router.back()
      } else {
        navigation?.goBack()
      }
    }, [router, navigation]),
    parseNextPath,
  }
}

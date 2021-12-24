import { useLinkTo } from '@react-navigation/native'
import Router from 'next/router'
import { useEffect } from 'react'
import { Platform } from 'react-native'

function NextLinkListener() {
  const linkTo = useLinkTo()

  // @ts-expect-error not all code paths return a value, that's fine
  useEffect(function triggerReactNavigationLinkOnWebRouteChange() {
    if (Platform.OS === 'web' && Router.router) {
      const handler = (path: string) => {
        linkTo(path)
      }
      Router.events.on('routeChangeComplete', handler)

      return () => {
        Router.events.off('routeChangeComplete', handler)
      }
    }
  }, [])

  return null
}

export { NextLinkListener }

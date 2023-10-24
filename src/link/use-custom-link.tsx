import { GestureResponderEvent, Platform } from 'react-native'

import { useRouter } from '../router'
import { LinkCoreProps } from './LinkCoreProps'

export type UseLinkProps = Pick<
  LinkCoreProps,
  'as' | 'shallow' | 'href' | 'scroll' | 'replace' | 'experimental'
>

export function useLink({
  href,
  as,
  shallow,
  scroll,
  replace,
  experimental,
}: UseLinkProps) {
  const router = useRouter()

  // https://github.com/react-navigation/react-navigation/blob/main/packages/native/src/useLinkProps.tsx#L64
  const onPress = (
    e?: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => {
    let shouldHandle = false

    if (Platform.OS !== 'web' || !e) {
      shouldHandle = e ? !e.defaultPrevented : true
    } else if (
      !e.defaultPrevented && // onPress prevented default
      // @ts-expect-error: these properties exist on web, but not in React Native
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
      // @ts-expect-error: these properties exist on web, but not in React Native
      (e.button == null || e.button === 0) && // ignore everything but left clicks
      // @ts-expect-error: these properties exist on web, but not in React Native
      [undefined, null, '', 'self'].includes(e.currentTarget?.target) // let browser handle "target=_blank" etc.
    ) {
      e.preventDefault()
      shouldHandle = true
    }

    if (shouldHandle) {
      if (href === '#') {
        // this is a way on web to stay on the same page
        // useful for conditional hrefs
        return
      }
      if (replace) {
        router.replace(href, as, { shallow, scroll, experimental })
      } else {
        router.push(href, as, {
          shallow,
          scroll,
        })
      }
    }
  }

  return {
    accessibilityRole: 'link' as const,
    onPress,
    href: router.parseNextPath(as || href),
  }
}

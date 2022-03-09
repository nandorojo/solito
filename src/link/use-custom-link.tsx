import { GestureResponderEvent, Platform } from 'react-native'

import { useRouter } from '../router'
import { LinkCoreProps } from './core'

export type useLinkProps = Pick<LinkCoreProps, 'as' | 'shallow' | 'href'>

export function useLink({ href, as, shallow }: useLinkProps) {
  const { push, parseNextPath } = useRouter()

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
      push(href, as, {
        shallow,
      })
    }
  }

  return {
    accessibilityRole: 'link' as const,
    onPress: Platform.select({ web: undefined, default: onPress }),
    href: parseNextPath(as || href),
    onClick: Platform.select({ web: onPress }),
  }
}

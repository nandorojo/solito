import type { ComponentType } from 'react'

import { openURL } from './linking'
import { useLink } from './use-custom-link'
import { LinkCoreProps } from './LinkCoreProps'

function LinkCore({
  children,
  href,
  as,
  Component,
  replace,
  experimental,
  target,
  rel,
  style,
  ...props
}: LinkCoreProps & {
  Component: ComponentType<any>
}) {
  const linkTo = useLink({
    href,
    as,
    replace,
    experimental,
  }).onPress
  const onPress = 'onPress' in props ? props.onPress : undefined
  return (
    <Component
      accessibilityRole="link"
      style={style}
      {...props}
      onPress={(e?: any) => {
        // @ts-expect-error: onPress is not a valid prop for the Component
        onPress?.(e)
        const link = as || href
        if (e?.defaultPrevented) return
        // Handles external URLs
        if (typeof link === 'string' && isAbsoluteUrl(link)) {
          openURL(link)
        } else {
          linkTo(e)
        }
      }}
    >
      {children}
    </Component>
  )
}

// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/
// Source - https://github.com/vercel/next.js/blob/77b5f79a4dff453abb62346bf75b14d859539b81/packages/next/shared/lib/utils.ts#L313
const isAbsoluteUrl = (url: string) => ABSOLUTE_URL_REGEX.test(url)

export { LinkCore }

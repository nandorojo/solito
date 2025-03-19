'use client'

import type { ComponentType } from 'react'
import { Platform } from 'react-native'

import { openURL } from './linking'
import { NextLink } from './next-link'
import { useLink } from './use-custom-link'
import { LinkCoreProps } from './LinkCoreProps'

function LinkCore({
  children,
  href,
  as,
  componentProps,
  Component,
  replace,
  experimental,
  target,
  rel,
  style,
  ...props
}: LinkCoreProps & {
  Component: ComponentType<any>
  componentProps?: any
}) {
  if (Platform.OS === 'web') {
    return (
      <NextLink
        {...props}
        replace={replace}
        href={href}
        as={as}
        passHref
        legacyBehavior
      >
        <Component
          style={style}
          {...componentProps}
          {...(target && { hrefAttrs: { target, rel } })}
        >
          {children}
        </Component>
      </NextLink>
    )
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const linkTo = useLink({
    href,
    as,
    replace,
    experimental,
  })
  return (
    <Component
      accessibilityRole="link"
      style={style}
      {...componentProps}
      onPress={(e?: any) => {
        componentProps?.onPress?.(e)
        const link = as || href
        if (e?.defaultPrevented) return
        // Handles external URLs
        if (typeof link === 'string' && isAbsoluteUrl(link)) {
          openURL(link)
        } else {
          linkTo.onPress(e)
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

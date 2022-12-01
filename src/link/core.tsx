import React from 'react'
import type { ComponentProps, ComponentType } from 'react'
import { Platform, Linking } from 'react-native'

import { NextLink } from './next-link'
import { useLink } from './use-custom-link'

export type LinkCoreProps = {
  children: React.ReactNode
} & Omit<
  ComponentProps<typeof NextLink>,
  'passHref' | 'replace' | 'legacyBehavior'
> &
  (
    | {
        replace?: false
        experimental?: undefined
      }
    | {
        replace: true
        experimental?: {
          nativeBehavior: 'stack-replace'
          isNestedNavigator: boolean
        }
      }
  )

function LinkCore({
  children,
  href,
  as,
  componentProps,
  Component,
  replace,
  experimental,
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
        <Component {...componentProps}>{children}</Component>
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
      {...componentProps}
      onPress={(e?: any) => {
        componentProps?.onPress?.(e)
        const link = as || href
        // Handles external URLs
        if (typeof link === 'string' && isAbsoluteUrl(link)) {
          Linking.openURL(link)
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
// Source credit NextJS - https://github.com/vercel/next.js/blob/77b5f79a4dff453abb62346bf75b14d859539b81/packages/next/shared/lib/utils.ts#L313
export const isAbsoluteUrl = (url: string) => ABSOLUTE_URL_REGEX.test(url)

export { LinkCore }

import NextLink from 'next/link'
import React from 'react'
import type { ComponentProps, ComponentType } from 'react'
import { Platform } from 'react-native'

import { parseNextPath } from '../router'
import { useLinkTo } from '../router/use-link-to'

export type LinkCoreProps = {
  children: React.ReactNode
} & Omit<ComponentProps<typeof NextLink>, 'passHref'>

function LinkCore({
  children,
  href,
  as,
  componentProps,
  Component,
  ...props
}: LinkCoreProps & {
  Component: ComponentType<any>
  componentProps?: any
}) {
  if (Platform.OS === 'web') {
    return (
      <NextLink {...props} href={href} as={as} passHref>
        <Component {...componentProps}>{children}</Component>
      </NextLink>
    )
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const linkTo = useLinkTo()
  return (
    <Component
      accessibilityRole="link"
      {...componentProps}
      onPress={(e?: any) => {
        componentProps?.onPress?.(e)
        if (!e?.defaultPrevented) {
          linkTo(parseNextPath(as || href))
        }
      }}
    >
      {children}
    </Component>
  )
}

export { LinkCore }

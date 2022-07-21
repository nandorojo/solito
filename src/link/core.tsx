import React from 'react'
import type { ComponentProps, ComponentType } from 'react'
import { Platform } from 'react-native'

import { parseNextPath } from '../router'
import { useLinkTo } from '../router/use-link-to'
import { NextLink } from './next-link'

export type LinkCoreProps = {
  children: React.ReactNode
  asChild?: boolean
} & Omit<ComponentProps<typeof NextLink>, 'passHref'>

function LinkCore({
  children: childrenProp,
  href,
  as,
  componentProps,
  Component,
  asChild,
  ...props
}: LinkCoreProps & {
  Component: ComponentType<any>
  componentProps?: any
}) {
  if (asChild) {
    React.Children.only(childrenProp)
  }

  if (Platform.OS !== 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const linkTo = useLinkTo()
    const childProps = {
      accessibilityRole: 'link',
      ...componentProps,
      onPress: (e?: any) => {
        componentProps?.onPress?.(e)
        if (!e?.defaultPrevented) {
          linkTo(parseNextPath(as || href))
        }
      },
    }
    return asChild
      ? React.cloneElement(childrenProp as any, childProps)
      : React.createElement(Component, childProps, childrenProp)
  }

  return (
    <NextLink {...props} href={href} as={as} passHref>
      {childrenProp}
    </NextLink>
  )
}

export { LinkCore }

import React from 'react'
import type { ComponentProps, ComponentType } from 'react'
import { Platform } from 'react-native'

import { NextLink } from './next-link'
import { useLink } from './use-custom-link'

export type LinkCoreProps = {
  children: React.ReactNode
} & Omit<ComponentProps<typeof NextLink>, 'passHref' | 'replace'> &
  (
    | {
        replace?: false
        experimental?: undefined
      }
    | {
        replace: true
        experimental?: {
          nativeBehavior: 'stack-replace'
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
      <NextLink {...props} replace={replace} href={href} as={as} passHref>
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
        linkTo.onPress(e)
      }}
    >
      {children}
    </Component>
  )
}

export { LinkCore }

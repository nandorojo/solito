'use client'
import { MotiPressableProps, MotiPressable } from 'moti/interactions'
import { forwardRef } from 'react'
import type { View } from 'react-native'

import { useLink, UseLinkProps } from '../link/use-custom-link'

export type MotiLinkProps = UseLinkProps &
  Omit<
    MotiPressableProps,
    // you can't pass any props that will be overridden by useLink
    | keyof UseLinkProps
    | keyof Pick<ReturnType<typeof useLink>, 'href' | 'accessibilityRole'>
  >

export const MotiLink = forwardRef<View, MotiLinkProps>((props, ref) => {
  const { onPress, ...linkProps } = useLink(props)

  const propsOnPress = 'onPress' in props ? props.onPress : undefined

  return (
    <MotiPressable
      {...props}
      {...linkProps}
      onPress={(e?: any) => {
        // @ts-expect-error no event argument
        // we let users pass an onPress prop, in case they want to preventDefault()
        propsOnPress?.(e)

        onPress?.(e)
      }}
      ref={ref}
    />
  )
})

MotiLink.displayName = 'MotiLink'

'use client'
import { MotiPressableProps, MotiPressable } from 'moti/interactions'
import { forwardRef } from 'react'
import type { View } from 'react-native'

import { useLink } from '../app/navigation/use-link'

type UseLinkProps = Parameters<typeof useLink>[0]

export type MotiLinkProps = UseLinkProps &
  Omit<
    MotiPressableProps,
    // you can't pass any props that will be overridden by useLink
    | keyof UseLinkProps
    | keyof Pick<ReturnType<typeof useLink>, 'href' | 'accessibilityRole'>
  >

export const MotiLink = forwardRef<View, MotiLinkProps>((props, ref) => {
  const { onPress, ...linkProps } = useLink(props)

  return (
    <MotiPressable
      {...props}
      {...linkProps}
      onPress={(e?: any) => {
        // @ts-expect-error no event argument
        // we let users pass an onPress prop, in case they want to preventDefault()
        props.onPress?.(e)

        onPress(e)
      }}
      ref={ref}
    />
  )
})

MotiLink.displayName = 'MotiLink'

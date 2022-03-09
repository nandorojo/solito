import { MotiPressableProps, MotiPressable } from 'moti/interactions'
import React, { forwardRef } from 'react'
import type { View } from 'react-native'

import { useLink, UseLinkProps } from '../link/use-custom-link'

export type MotiLinkProps = UseLinkProps &
  Omit<MotiPressableProps, keyof UseLinkProps>

export const MotiLink = forwardRef<View, MotiLinkProps>((props, ref) => {
  const linkProps = useLink(props)

  return <MotiPressable {...props} {...linkProps} ref={ref} />
})

MotiLink.displayName = 'MotiLink'

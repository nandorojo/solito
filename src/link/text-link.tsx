'use client'
import { TextProps, Text } from 'react-native'

import { LinkCore } from './core'
import { LinkCoreProps } from './LinkCoreProps'

type TextLinkProps = LinkCoreProps & { textProps?: TextProps }

function TextLink({ textProps, ...props }: TextLinkProps) {
  return (
    <LinkCore
      {...props}
      Component={Text}
      componentProps={{ selectable: false, ...textProps }}
    />
  )
}

export { TextLink }
export type { TextLinkProps }

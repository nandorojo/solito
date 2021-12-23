import React from 'react'
import { TextProps, Text } from 'react-native'

import { LinkCore, LinkCoreProps } from './core'

type TextLinkProps = LinkCoreProps & { textProps?: TextProps }

function TextLink({ textProps, ...props }: TextLinkProps) {
  return <LinkCore {...props} Component={Text} componentProps={textProps} />
}

export { TextLink }
export type { TextLinkProps }

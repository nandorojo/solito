import { Text } from 'react-native'

import { LinkCore } from './core'
import { LinkCoreProps } from './LinkCoreProps'

type TextLinkProps = LinkCoreProps

function TextLink(props: TextLinkProps) {
  return <LinkCore {...props} Component={Text} />
}

export { TextLink }
export type { TextLinkProps }

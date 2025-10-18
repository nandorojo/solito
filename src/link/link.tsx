import { Pressable } from 'react-native'

import { LinkCore } from './core'
import { LinkCoreProps } from './LinkCoreProps'

type LinkProps = LinkCoreProps

function Link(props: LinkProps) {
  return <LinkCore {...props} Component={Pressable} />
}

export { Link }
export type { LinkProps }

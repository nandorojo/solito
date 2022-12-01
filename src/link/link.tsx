'use client'
import { Platform, Pressable, ViewProps, View } from 'react-native'

import { LinkCore, LinkCoreProps } from './core'

type LinkProps = LinkCoreProps & { viewProps?: ViewProps }

function Link({ viewProps, ...props }: LinkProps) {
  return (
    <LinkCore
      {...props}
      Component={Platform.select({
        web: View,
        default: Pressable as any,
      })}
      componentProps={viewProps}
    />
  )
}

export { Link }
export type { LinkProps }

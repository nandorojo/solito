import NextLink from 'next/link'
import type * as native from './link.native'

export const Link = NextLink as typeof native.Link
export type { LinkProps } from './link.native'

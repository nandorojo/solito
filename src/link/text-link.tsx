import NextLink from 'next/link'
import type * as native from './text-link.native'

export const TextLink = NextLink as typeof native.TextLink
export type { TextLinkProps } from './text-link.native'

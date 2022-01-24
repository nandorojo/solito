/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

interface SolitoCustomPageOptions {}

interface SolitoPageOptions extends SolitoCustomPageOptions {
  previousPagePath?: string | null
}

type SolitoPage<P = {}, IP = P> = NextPage<P, IP> & {
  navigationOptions?:
    | SolitoPageOptions
    | ((router?: AppProps['router']) => SolitoPageOptions)
}

export { SolitoPage, SolitoPageOptions, SolitoCustomPageOptions }

/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

interface SolitoCustomPageOptions {}

interface SolitoPageOptions extends SolitoCustomPageOptions {
  previousPagePath?: string | null
}

type NavigationOptions =
  | SolitoPageOptions
  | ((router?: AppProps['router']) => SolitoPageOptions)

type SolitoPage<P = {}, IP = P> = NextPage<P, IP> & {
  navigationOptions?: NavigationOptions
}

export type SolitoAppProps<P = {}> = AppProps<P> & {
  navigationOptions?: NavigationOptions
  getLayout?: (
    page: React.ReactNode,
    options?: NavigationOptions
  ) => React.ReactNode
}

export { SolitoPage, SolitoPageOptions, SolitoCustomPageOptions }

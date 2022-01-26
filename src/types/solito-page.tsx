/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

interface SolitoCustomNavigationOptions {}

interface SolitoNavigationOptions extends SolitoCustomNavigationOptions {
  previousPagePath?: string | null
}

type NavigationOptions =
  | SolitoNavigationOptions
  | ((router?: AppProps['router']) => SolitoNavigationOptions)

type SolitoPage<P = {}, IP = P> = NextPage<P, IP> & {
  navigationOptions?: NavigationOptions
}

export type SolitoAppProps<P = {}> = Omit<AppProps<P>, 'Component'> & {
  getLayout?: (
    page: React.ReactNode,
    options?: NavigationOptions
  ) => React.ReactNode
  Component: AppProps<P>['Component'] & {
    navigationOptions?: NavigationOptions
  }
}

export { SolitoPage, SolitoNavigationOptions, SolitoCustomNavigationOptions }

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
  getLayout?: (
    page: React.ReactNode,
    options?: NavigationOptions
  ) => React.ReactNode
}

export type SolitoAppProps<P = {}> = Omit<AppProps<P>, 'Component'> & {
  Component: AppProps<P>['Component'] & {
    navigationOptions?: NavigationOptions
    getLayout?: (
      page: React.ReactNode,
      options?: NavigationOptions
    ) => React.ReactNode
  }
}

export type {
  SolitoPage,
  SolitoNavigationOptions,
  SolitoCustomNavigationOptions,
}

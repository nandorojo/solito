// this is a fork on useLinkBuilder()
// the only difference is that `navigation` is passed as an argument to the function
// that way, on 'tabPress', we can access the local navigation object
// it's used under the hood only.
// it also still works if enabled !== true, since we want to build a link even when that's the case
// compare to: https://github.com/react-navigation/react-navigation/blob/e947943ace33086405210e9454329be47d76478f/packages/native/src/useLinkBuilder.tsx#L48

import {
  getPathFromState,
  NavigationHelpers,
  //   NavigationHelpersContext,
  NavigationProp,
  ParamListBase
} from '@react-navigation/core'
import * as React from 'react'

import { LinkingOptions } from '@react-navigation/native'

// this is scary...
// but react navigation doesn't expose LinkingContext 😬
import LinkingContext from '@react-navigation/native/lib/module/LinkingContext'

type NavigationObject =
  | NavigationHelpers<ParamListBase>
  | NavigationProp<ParamListBase>

type MinimalState = {
  index: number
  routes: { name: string; params?: object; state?: MinimalState }[]
}

const getRootStateForNavigate = (
  navigation: NavigationObject,
  state: MinimalState
): MinimalState => {
  const parent = navigation.getParent()

  if (parent) {
    const parentState = parent.getState()

    return getRootStateForNavigate(parent, {
      index: 0,
      routes: [
        {
          ...parentState.routes[parentState.index],
          state: state
        }
      ]
    })
  }

  return state
}

/**
 * Build destination link for a navigate action.
 * Useful for showing anchor tags on the web for buttons that perform navigation.
 */
export function useBuildLink() {
  //   const navigation = React.useContext(NavigationHelpersContext)
  const linking = React.useContext(LinkingContext)

  const buildLink = React.useCallback(
    (navigation: any, name: string, params?: object) => {
      const { options } = (linking as { options?: LinkingOptions<{}> }) || {}

      //   if (options?.enabled === false) {
      //     return undefined
      //   }

      const state = navigation
        ? getRootStateForNavigate(navigation, {
            index: 0,
            routes: [{ name, params }]
          })
        : // If we couldn't find a navigation object in context, we're at root
          // So we'll construct a basic state object to use
          {
            index: 0,
            routes: [{ name, params }]
          }

      const path = options?.getPathFromState
        ? options.getPathFromState(state, options?.config)
        : getPathFromState(state, options?.config)

      return path
    },
    [linking]
  )

  return buildLink
}

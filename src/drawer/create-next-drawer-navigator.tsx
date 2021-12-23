// https://reactnavigation.org/docs/custom-navigators/#type-checking-navigators
// https://github.com/react-navigation/react-navigation/blob/e947943ace33086405210e9454329be47d76478f/packages/drawer/src/navigators/createDrawerNavigator.tsx

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import {
  DrawerNavigationOptions,
  DrawerNavigationEventMap,
  DrawerNavigationConfig,
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types'
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  DrawerNavigationState,
  DrawerRouterOptions,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native'
import { useRouter } from 'next/router'
import React, { Children, useCallback, cloneElement } from 'react'

import { useBuildLink } from '../navigation/build-link'

const { Navigator } = createDrawerNavigator()

type Props = DefaultNavigatorOptions<
  ParamListBase,
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap
> &
  DrawerRouterOptions &
  DrawerNavigationConfig & {
    Component?: React.ComponentType<any>
    pageProps?: any
  }
/**
 * Component that renders the navigation list in the drawer.
 *
 * Forked from https://github.com/react-navigation/react-navigation/blob/e947943ace33086405210e9454329be47d76478f/packages/drawer/src/views/DrawerItemList.tsx#L22
 */
export function DrawerItemList({
  state,
  navigation,
  descriptors,
}: {
  state: DrawerNavigationState<ParamListBase>
  navigation: DrawerNavigationHelpers
  descriptors: DrawerDescriptorMap
}) {
  const buildLink = useBuildLink()
  // const buildLink = useLinkBuilder()
  const nextRouter = useRouter()

  const focusedRoute = state.routes[state.index]
  const focusedDescriptor = descriptors[focusedRoute.key]
  const focusedOptions = focusedDescriptor.options

  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor,
  } = focusedOptions

  return state.routes.map((route, i) => {
    const focused = i === state.index
    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
    } = descriptors[route.key].options

    const to = buildLink(navigation, route.name)

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
        labelStyle={drawerLabelStyle}
        style={drawerItemStyle}
        to={to}
        // @ts-expect-error web only
        onMouseEnter={() => {
          if (nextRouter && to) {
            nextRouter.prefetch(to)
          }
        }}
        onPress={() => {
          if (nextRouter && to) {
            if (focused) {
              navigation.dispatch(DrawerActions.closeDrawer())
            }
            nextRouter.push(to)
          } else {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate({ name: route.name, merge: true })),
              target: state.key,
            })
          }
        }}
      />
    )
  }) as React.ReactNode as React.ReactElement
}

function DrawerNavigator({ children, Component, pageProps, ...props }: Props) {
  const nextRouter = useRouter()

  const nextComponentChild = useCallback(
    (props) => {
      return Component && <Component {...pageProps} {...props} />
    },
    [Component, pageProps]
  )

  return (
    <Navigator
      drawerContent={function Content(props) {
        return (
          <>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </>
        )
      }}
      {...props}
    >
      {Children.map(children, (child) => {
        if (nextRouter && Component) {
          return cloneElement(child as any, {
            component: undefined,
            getComponent: undefined,
            children: nextComponentChild,
          })
        }

        return child
      })}
    </Navigator>
  )
}

export const createNextDrawerNavigator = createNavigatorFactory<
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationOptions,
  DrawerNavigationEventMap,
  typeof DrawerNavigator
>(DrawerNavigator)

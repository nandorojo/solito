import { NavigationContext } from '@react-navigation/core'
import { NavigationState } from '@react-navigation/native'
import { useContext } from 'react'

export const useNavigation = () => useContext(NavigationContext)

export const getPathName = (navigationState?: NavigationState) => {
  return (
    navigationState?.routes?.[navigationState?.index]?.path ??
    navigationState?.routes?.[navigationState?.index]?.state?.routes[0]?.path ??
    '/'
  )
}

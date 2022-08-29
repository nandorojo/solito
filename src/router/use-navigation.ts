import {
  NavigationContext,
  NavigationContainerRefContext,
} from '@react-navigation/core'
import { useContext } from 'react'

export const useNavigation = () => {
  const root = useContext(NavigationContainerRefContext)
  const navigation = useContext(NavigationContext)

  if (navigation === undefined && root === undefined) {
    throw new Error(
      "Couldn't find a navigation object. Is your component inside NavigationContainer?"
    )
  }

  return navigation !== null && navigation !== void 0 ? navigation : root
}

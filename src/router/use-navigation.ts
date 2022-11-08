import {
  NavigationContainerRefContext,
  NavigationContext,
} from '@react-navigation/core'
import { useContext } from 'react'

export { StackActions } from "@react-navigation/native";

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

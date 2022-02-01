import { NavigationContext } from '@react-navigation/core'
import { useContext } from 'react'

export const useNavigation = () => useContext(NavigationContext)

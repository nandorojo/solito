import { NavigationRouteContext } from '@react-navigation/native'
import { useContext } from 'react'

export const useRoute = () => useContext(NavigationRouteContext)

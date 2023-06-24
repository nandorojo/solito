import { Platform } from 'react-native'
import useNextPathname from './use-next-pathname'
import { useRoute } from '../../params/use-route'

// TODO test this with react navigation and expo router. does it work?
export function usePathname() {
  if (Platform.OS === 'web') {
    return useNextPathname()
  }

  const path = useRoute()?.path

  return path?.includes('?') ? path.split('?')[0] : path
}

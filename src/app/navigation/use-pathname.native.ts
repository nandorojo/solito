import { useRoute } from '../../params/use-route'

// TODO test this with react navigation and expo router. does it work?
export function usePathname() {
  const path = useRoute()?.path

  return path?.includes('?') ? path.split('?')[0] : path
}

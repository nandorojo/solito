import useNextPathname from './use-next-pathname'

// TODO test this with react navigation and expo router. does it work?
export function usePathname() {
  return useNextPathname()
}

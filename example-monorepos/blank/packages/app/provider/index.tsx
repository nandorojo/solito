import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <Dripsy>{children}</Dripsy>
    </NavigationProvider>
  )
}

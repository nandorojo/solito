import { NavigationProvider } from './navigation'
import { TailwindProvider } from 'tailwindcss-react-native'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <TailwindProvider preview={true}>{children}</TailwindProvider>
    </NavigationProvider>
  )
}

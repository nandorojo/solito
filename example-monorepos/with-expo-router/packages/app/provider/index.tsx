import { Dripsy } from './dripsy'

export function Provider({ children }: { children: React.ReactNode }) {
  return <Dripsy>{children}</Dripsy>
}

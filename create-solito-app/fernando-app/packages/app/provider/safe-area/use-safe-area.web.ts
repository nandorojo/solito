import type { useSafeArea as nativeHook } from './use-safe-area'

const area = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export function useSafeArea(): ReturnType<typeof nativeHook> {
  return area
}

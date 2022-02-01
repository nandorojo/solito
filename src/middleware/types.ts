import type { useLinkProps, useLinkTo } from '@react-navigation/native'

export type MiddlewareContextType = {
  useLinkTo?: typeof useLinkTo
  useLinkProps?: typeof useLinkProps
}

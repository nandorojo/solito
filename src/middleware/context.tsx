import { useLinkTo } from '@react-navigation/native'
import { createContext } from 'react'

import { MiddlewareContextType } from './types'

export const MiddlewareContext = createContext<MiddlewareContextType>({
  useLinkTo,
  // useLinkProps,
})

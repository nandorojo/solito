import { useLinkTo as useNativeLinkTo } from '@react-navigation/native'
import { useContext } from 'react'

import { MiddlewareContext } from '../middleware/context'

export function useLinkTo() {
  const hook = useContext(MiddlewareContext).useLinkTo ?? useNativeLinkTo

  return hook()
}

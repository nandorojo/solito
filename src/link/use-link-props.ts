import { useLinkProps as useNativeLinkProps } from '@react-navigation/native'
import { useContext } from 'react'

import { MiddlewareContext } from '../middleware/context'

export const useLinkProps: typeof useNativeLinkProps = (...params) => {
  const hook = useContext(MiddlewareContext).useLinkProps ?? useNativeLinkProps

  return hook(...params)
}

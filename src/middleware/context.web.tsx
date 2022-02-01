import { createContext } from 'react'

import { MiddlewareContextType } from './types'

export const MiddlewareContext = createContext<MiddlewareContextType>({
  useLinkTo() {
    return function () {
      throw new Error(
        '[solito] useLinkTo should not be called on Web. Is next/router defined?'
      )
    }
  },
  useLinkProps() {
    throw new Error(
      '[solito] useLinkProps should not be called on Web. Is next/router defined?'
    )
  },
})

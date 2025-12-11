import { createContext } from 'react'

import { MiddlewareContextType } from './types'

function error() {
  throw new Error(
    '[solito] useLinkTo should not be called on Web. Is next/router defined?'
  )
}

export const MiddlewareContext = createContext<MiddlewareContextType>({
  useLinkTo() {
    return error
  },
})

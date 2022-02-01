import React from 'react'

import { MiddlewareContext } from './context'
import { MiddlewareContextType } from './types'

type Props = {
  middleware: MiddlewareContextType
}

export function SolitoProvider({
  children,
  middleware,
}: { children: React.ReactNode } & Props) {
  return (
    <MiddlewareContext.Provider value={middleware}>
      {children}
    </MiddlewareContext.Provider>
  )
}

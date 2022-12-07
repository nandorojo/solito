import { ContextType, createContext, useContext, useState } from 'react'

import { imageConfigDefault } from './helpers'

const SolitoImageContext =
  createContext<Partial<typeof imageConfigDefault>>(imageConfigDefault)

export const SolitoImageProvider = ({
  children,
  ...rest
}: {
  children: React.ReactNode
} & ContextType<typeof SolitoImageContext>) => {
  const parent = useContext(SolitoImageContext)
  const [context] = useState(() => ({
    ...parent,
    ...rest,
  }))

  return (
    <SolitoImageContext.Provider value={context}>
      {children}
    </SolitoImageContext.Provider>
  )
}

export const useSolitoImageContext = () => useContext(SolitoImageContext)

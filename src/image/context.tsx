import { createContext, useContext, useState } from 'react'

import { imageConfigDefault } from './helpers'

const SolitoImageContext = createContext(imageConfigDefault)

export const SolitoImageProvider = ({
  children,
  deviceSizes,
  imageSizes,
  nextJsURL,
  path,
}: {
  children: React.ReactNode
} & typeof imageConfigDefault) => {
  const parent = useContext(SolitoImageContext)
  const [context] = useState(() => ({
    ...parent,
    deviceSizes,
    imageSizes,
    nextJsURL,
    path,
  }))

  return (
    <SolitoImageContext.Provider value={context}>
      {children}
    </SolitoImageContext.Provider>
  )
}

export const useSolitoImageContext = () => useContext(SolitoImageContext)

import { createContext } from 'react'
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
  return (
    <SolitoImageContext.Provider value={config}>
      {children}
    </SolitoImageContext.Provider>
  )
}

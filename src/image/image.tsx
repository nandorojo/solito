import { forwardRef } from 'react'
import { Image, createElement } from 'react-native'

import { SolitoImageProps } from './image.types'
import { useSolitoImage } from './use-solito-image'

export const SolitoImage = forwardRef<Image, SolitoImageProps>(function Img(
  props,
  ref
) {
  const imageProps = useSolitoImage(props)

  return createElement(Image, { ...imageProps, ref }) as any
})

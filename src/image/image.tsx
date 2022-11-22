import { Image, createElement } from 'react-native'

import { SolitoImageProps } from './image.types'
import { useSolitoImage } from './use-solito-image'

export function SolitoImage(props: SolitoImageProps) {
  const imageProps = useSolitoImage(props)

  return createElement(Image, imageProps)
}

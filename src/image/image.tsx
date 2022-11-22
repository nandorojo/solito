import { forwardRef } from 'react'
import { Image } from 'react-native'

import { SolitoImageProps } from './image.types'
import { useSolitoImage } from './use-solito-image'

const SolitoImage = forwardRef<Image, SolitoImageProps>(function Img(
  props,
  ref
) {
  const imageProps = useSolitoImage(props)

  return <Image {...imageProps} ref={ref} />
})

export default SolitoImage

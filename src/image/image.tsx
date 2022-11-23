import { forwardRef } from 'react'
import { Image } from 'react-native'

import { SolitoImageProps } from './image.types'
import { useSolitoImage } from './use-solito-image'

const SolitoImage = forwardRef<Image, SolitoImageProps>(function Img(
  props,
  ref
) {
  const { onLoadingComplete, ...imageProps } = useSolitoImage(props)

  return (
    <Image
      {...imageProps}
      onLoad={
        onLoadingComplete && ((e) => onLoadingComplete(e.nativeEvent.source))
      }
      ref={ref}
    />
  )
})

export default SolitoImage

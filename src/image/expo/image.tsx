import { Image } from 'expo-image'
import { forwardRef } from 'react'

import { SolitoImageProps } from '../image.types'
import { useSolitoImage } from '../use-solito-image'

const SolitoImage = forwardRef<Image, SolitoImageProps>(function Img(
  props,
  ref
) {
  const {
    onLoadingComplete,
    onError,
    resizeMode = 'contain',
    ...imageProps
  } = useSolitoImage(props)

  return (
    <Image
      {...imageProps}
      placeholder={props.placeholder === 'blur' ? props.blurDataURL : undefined}
      resizeMode={resizeMode}
      onLoad={onLoadingComplete && ((e) => onLoadingComplete(e.source))}
      onError={onError}
      ref={ref}
      style={imageProps.style}
      contentPosition={props.contentPosition}
    />
  )
})

export type SolitoImageRef = Image

export default SolitoImage

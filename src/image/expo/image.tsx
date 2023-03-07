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
    resizeMode = 'contain',
    ...imageProps
  } = useSolitoImage(props)

  return (
    <Image
      {...imageProps}
      placeholder={props.placeholder === 'blur' ? props.blurDataURL : undefined}
      resizeMode={resizeMode}
      onLoad={onLoadingComplete && ((e) => onLoadingComplete(e.source))}
      ref={ref}
      // @ts-expect-error expo-image has weird types
      style={imageProps.style}
      contentPosition={props.contentPosition}
    />
  )
})

export default SolitoImage

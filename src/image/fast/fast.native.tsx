import { ComponentProps } from 'react'
import FastImage from 'react-native-fast-image'

import { SolitoImageProps } from '../image.types'
import { useSolitoImage } from '../use-solito-image'

export default function SolitoFastImage(
  props: Omit<SolitoImageProps, 'resizeMode' | 'style'> &
    Pick<ComponentProps<typeof FastImage>, 'style' | 'resizeMode' | 'testID'>
) {
  const {
    source,
    resizeMode,
    onLoadingComplete,
    onError,
    style,
    ...imageProps
  } = useSolitoImage(props as SolitoImageProps)

  return (
    <FastImage
      source={
        source && typeof source == 'object' && 'uri' in source
          ? {
              priority: props.priority ? 'high' : 'normal',
              cache: 'web',
              headers: source.headers,
              uri: source.uri,
            }
          : (source as number)
      }
      resizeMode={props.resizeMode}
      onLoad={onLoadingComplete && ((e) => onLoadingComplete(e.nativeEvent))}
      onError={onError}
      // @ts-expect-error this is fine
      style={style}
      {...imageProps}
    />
  )
}

import NextImage from 'next/image'
import { forwardRef } from 'react'
import { Image, ImageResizeMode, StyleSheet } from 'react-native'
// @ts-expect-error missing types
import { unstable_createElement } from 'react-native-web'

import { SolitoImageProps } from './image.types'

export const SolitoImage = forwardRef<Image, SolitoImageProps>(
  function SolitoImage({ resizeMode = 'contain', fill, style, ...props }, ref) {
    return unstable_createElement(NextImage, {
      ...props,
      ref,
      fill,
      style: [
        fill && StyleSheet.absoluteFill,
        {
          objectFit: objectFitFromResizeMode(resizeMode),
        },
        style,
      ],
    })
  }
)

const styles = StyleSheet.create<
  StyleSheet.NamedStyles<Record<ImageResizeMode, any>>
>({
  cover: {
    // @ts-expect-error
    objectFit: 'cover',
  },
  contain: {
    // @ts-expect-error
    objectFit: 'contain',
  },
  stretch: {
    // @ts-expect-error
    objectFit: 'fill',
  },
  center: {
    // @ts-expect-error
    objectFit: 'none',
  },
})

const objectFitFromResizeMode = (resizeMode: ImageResizeMode) => {
  const result = styles[resizeMode]

  if (!result) {
    throw new Error(`[solito/image] Invalid resizeMode: ${resizeMode}`)
  }

  return result
}

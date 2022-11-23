import NextImage from 'next/image'
import { forwardRef, useRef } from 'react'
import { Image, ImageResizeMode, StyleSheet } from 'react-native'
// @ts-expect-error missing types
import { unstable_createElement } from 'react-native-web'
// @ts-expect-error missing types
import useElementLayout from 'react-native-web/dist/modules/useElementLayout'

import { mergeRefs } from '../helpers/merge-refs'
import { SolitoImageProps } from './image.types'

const SolitoImage = forwardRef<Image, SolitoImageProps>(function SolitoImage(
  { resizeMode = 'contain', fill, style, onLayout, ...props },
  ref
) {
  // add back onLayout when this is solved: https://github.com/vercel/next.js/discussions/43267
  // const localRef = useRef<Image>(null)
  // useElementLayout(
  //   // https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/View/index.js#L88
  //   localRef,
  //   onLayout
  // )
  return unstable_createElement(NextImage, {
    ...props,
    // ref: mergeRefs([ref, localRef]),
    fill,
    style: [
      fill && StyleSheet.absoluteFill,
      {
        objectFit: objectFitFromResizeMode(resizeMode),
      },
      style,
    ],
  })
})

export default SolitoImage

const objectFitFromResizeMode = (resizeMode: ImageResizeMode) => {
  if (resizeMode === 'cover') {
    return 'cover'
  }
  if (resizeMode === 'contain') {
    return 'contain'
  }
  if (resizeMode === 'stretch') {
    return 'fill'
  }
  if (resizeMode === 'center') {
    return 'none'
  }

  throw new Error(`[solito/image] Invalid resizeMode: ${resizeMode}`)
}

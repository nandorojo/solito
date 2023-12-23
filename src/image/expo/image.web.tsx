'use client'
import {
  ImageContentPosition,
  ImageContentPositionObject,
  ImageContentPositionString,
  ImageContentPositionValue,
} from 'expo-image'
import NextImage from 'next/image'
import { forwardRef } from 'react'
import { Image, ImageResizeMode, StyleSheet } from 'react-native'
// @ts-expect-error missing types
import { unstable_createElement } from 'react-native-web'

import { useSolitoImageContext } from '../context'
import { SolitoImageProps } from '../image.types'

const SolitoImage = forwardRef<Image, SolitoImageProps>(function SolitoImage(
  {
    contentFit,
    resizeMode = 'contain',
    fill,
    style,
    onLayout,
    onError,
    contentPosition,
    ...props
  },
  ref
) {
  const { loader } = useSolitoImageContext()
  return unstable_createElement(NextImage, {
    ...props,
    ref,
    loader: props.loader ?? loader,
    fill,
    onError,
    style: [
      fill && StyleSheet.absoluteFill,
      {
        objectFit: contentFit || objectFitFromResizeMode(resizeMode),
        objectPosition: getObjectPositionFromContentPositionObject(
          resolveContentPosition(contentPosition)
        ),
      },
      style,
    ],
  })
})

export default SolitoImage

// FORKED FROM EXPO IMAGE

/**
 * It resolves a stringified form of the `contentPosition` prop to an object,
 * which is the only form supported in the native code.
 *
 * https://github.com/expo/expo/blob/baea6e76d0c6f865885aa2fb1c8f7732c119c300/packages/expo-image/src/utils.ts#L53
 */
function resolveContentPosition(
  contentPosition?: ImageContentPosition
): ImageContentPositionObject {
  if (typeof contentPosition === 'string') {
    const contentPositionStringMappings: Record<
      ImageContentPositionString,
      ImageContentPositionObject
    > = {
      center: { top: '50%', left: '50%' },
      top: { top: 0, left: '50%' },
      right: { top: '50%', right: 0 },
      bottom: { bottom: 0, left: '50%' },
      left: { top: '50%', left: 0 },
      'top center': { top: 0, left: '50%' },
      'top right': { top: 0, right: 0 },
      'top left': { top: 0, left: 0 },
      'right center': { top: '50%', right: 0 },
      'right top': { top: 0, right: 0 },
      'right bottom': { bottom: 0, right: 0 },
      'bottom center': { bottom: 0, left: '50%' },
      'bottom right': { bottom: 0, right: 0 },
      'bottom left': { bottom: 0, left: 0 },
      'left center': { top: '50%', left: 0 },
      'left top': { top: 0, left: 0 },
      'left bottom': { bottom: 0, left: 0 },
    }
    const contentPositionObject = contentPositionStringMappings[contentPosition]

    if (!contentPositionObject) {
      console.warn(
        `[expo-image]: Content position "${contentPosition}" is invalid`
      )
      return contentPositionStringMappings.center
    }
    return contentPositionObject
  }
  return contentPosition ?? { top: '50%', left: '50%' }
}
function ensureUnit(value: string | number) {
  const trimmedValue = String(value).trim()
  if (trimmedValue.endsWith('%')) {
    return trimmedValue
  }
  return `${trimmedValue}px`
}

type KeysOfUnion<T> = T extends T ? keyof T : never

function getObjectPositionFromContentPositionObject(
  contentPosition?: ImageContentPositionObject
): string {
  const resolvedPosition = { ...contentPosition } as Record<
    KeysOfUnion<ImageContentPositionObject>,
    ImageContentPositionValue
  >
  if (!resolvedPosition) {
    return '50% 50%'
  }
  if (resolvedPosition.top == null && resolvedPosition.bottom == null) {
    resolvedPosition.top = '50%'
  }
  if (resolvedPosition.left == null && resolvedPosition.right == null) {
    resolvedPosition.left = '50%'
  }

  return (
    (['top', 'bottom', 'left', 'right'] as const)
      .map((key) => {
        if (key in resolvedPosition) {
          return `${key} ${ensureUnit(resolvedPosition[key])}`
        }
        return ''
      })
      .join(' ') || '50% 50%'
  )
}
// END FORKED FROM EXPO IMAGE

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

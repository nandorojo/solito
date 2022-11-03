import NextImage from 'next/image'
// @ts-expect-error missing types
import { unstable_createElement } from 'react-native-web'

import { SolitoImageProps } from './image.types'

export function SolitoImage(props: SolitoImageProps) {
  return unstable_createElement(NextImage, props)
}

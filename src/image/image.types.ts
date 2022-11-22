import type NextImage from 'next/image'
import type { ImageStyle, StyleProp, ImageProps } from 'react-native'

type AccessibilityProp<key extends string> = key extends `aria-${string}`
  ? key
  : never

type NextImageProps = React.ComponentProps<typeof NextImage>

export type SolitoImageProps = Pick<
  NextImageProps,
  | AccessibilityProp<keyof NextImageProps>
  | 'alt'
  | 'blurDataURL'
  | 'placeholder'
  | 'loader'
  | 'priority'
  | 'loading'
  | 'fill'
  | 'onLoadingComplete'
  | 'sizes'
  | 'quality'
  | 'crossOrigin'
  | 'referrerPolicy'
  | 'unoptimized'
  | 'quality'
> & {
  // TODO extract resize mode, object fit
  style?: ImageStyle
} & (
    | {
        src: string
        height: number
        width: number
      }
    | {
        src: Exclude<any, string>
        height?: number
        width?: number
      }
  ) &
  Pick<ImageProps, 'onLayout'>

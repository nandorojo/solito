import type NextImage from 'next/image'
import type { ImageStyle, ImageProps } from 'react-native'

export type AccessibilityProp<key extends string> = key extends `aria-${string}`
  ? key
  : key extends `accessibility${Capitalize<string>}`
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
  Pick<
    ImageProps,
    'onLayout' | 'resizeMode' | AccessibilityProp<keyof ImageProps>
  > & {
    onLoadingComplete?: (info: { height: number; width: number }) => void
  }

import { ImageContentPosition, ImageProps } from 'expo-image'
import type NextImage from 'next/image'
import type { ImageStyle } from 'react-native'

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
  | 'sizes'
  | 'quality'
  | 'crossOrigin'
  | 'referrerPolicy'
  | 'quality'
  | 'unoptimized'
> & {
  style?: ImageStyle
} & (
    | {
        src: string
        height: number
        width: number
        fill?: false
      }
    | {
        src: string
        height?: number
        width?: number
        fill: true
      }
    | {
        src: Exclude<NextImageProps['src'], string> | number
        height?: number
        width?: number
        fill?: boolean
      }
  ) &
  Pick<
    ImageProps,
    | 'onLayout'
    | 'contentFit'
    | 'resizeMode'
    | 'transition'
    | 'recyclingKey'
    | AccessibilityProp<keyof ImageProps>
  > & {
    onLoadingComplete?: (info: { height: number; width: number }) => void
    onError?: () => void
    fill?: boolean
    contentPosition?: ImageContentPosition
  }

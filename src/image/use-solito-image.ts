import { ImageStyle } from 'expo-image'
import { useMemo, useSyncExternalStore } from 'react'
import { ImageProps, Dimensions, StyleSheet } from 'react-native'

import { useSolitoImageContext } from './context'
import { defaultLoader } from './default-loader'
import {
  generateImgAttrs,
  getInt,
  imageConfigDefault,
  resolveSourceFromImgAttributes,
} from './helpers'
import { SolitoImageProps } from './image.types'
import { ImageConfig } from './types'

export type UseSolitoImage = Pick<
  ImageProps,
  | Extract<keyof ImageProps, keyof SolitoImageProps>
  | 'progressiveRenderingEnabled'
  | 'source'
  | 'accessible'
  | 'onLayout'
> & {
  onLoadingComplete?: (info: { height: number; width: number }) => void
  onError?: () => void
  style: Array<ImageStyle | undefined>
}

export function useSolitoImage({
  src,
  loader,
  width,
  height,
  quality = 75,
  crossOrigin,
  referrerPolicy,
  alt,
  fill,
  onLoadingComplete,
  onError,
  loading,
  priority,
  placeholder,
  blurDataURL,
  sizes,
  style,
  onLayout,
  unoptimized,
  ...props
}: SolitoImageProps): UseSolitoImage {
  const contextConfig = useSolitoImageContext()
  const config = useMemo<ImageConfig>(() => {
    const c = { ...imageConfigDefault, ...contextConfig }
    const allSizes = [...c.deviceSizes, ...c.imageSizes].sort((a, b) => a - b)
    const deviceSizes = c.deviceSizes.sort((a, b) => a - b)
    return { ...c, allSizes, deviceSizes }
  }, [contextConfig])

  const headers: { [key in string]: string } = {}
  if (crossOrigin === 'use-credentials') {
    headers['Access-Control-Allow-Credentials'] = 'true'
  }
  if (referrerPolicy != null) {
    headers['Referrer-Policy'] = referrerPolicy
  }

  const uri = useSyncExternalStore<string | undefined>(
    (callback) => {
      const subscription = Dimensions.addEventListener('change', callback)

      return () => subscription?.remove()
    },
    () => {
      const dimensions = Dimensions.get('window')

      if (typeof src == 'string') {
        const attrs = generateImgAttrs({
          src,
          config,
          loader: ({ config: _, ...opts }) => {
            if (loader) {
              return loader(opts)
            }
            if (config.loader) {
              return config.loader({
                quality: Number(quality ?? 75),
                src: opts.src,
                width: opts.width,
              })
            }
            return defaultLoader({ ...opts, config })
          },
          unoptimized: Boolean(unoptimized),
          quality: getInt(quality || 75),
          sizes,
          width: getInt(width || 400),
        })
        const { uri } = resolveSourceFromImgAttributes({
          ...attrs,
          dimensions,
        })

        return uri
      }
      return undefined
    }
  )

  const source = useMemo<ImageProps['source']>(() => {
    const headers: { [key in string]: string } = {}
    if (crossOrigin === 'use-credentials') {
      headers['Access-Control-Allow-Credentials'] = 'true'
    }
    if (referrerPolicy != null) {
      headers['Referrer-Policy'] = referrerPolicy
    }
    if (typeof uri == 'string') {
      return {
        uri,
        height,
        width,
        headers,
        cache: priority ? 'force-cache' : 'default',
      }
    }
    return src as number
  }, [uri, src, height, width, priority, referrerPolicy, crossOrigin])

  return {
    ...props,
    progressiveRenderingEnabled: true,
    onLoadingComplete,
    onError,
    source,
    accessible: Boolean(alt),
    onLayout,
    style: [
      fill
        ? StyleSheet.absoluteFill
        : {
            height,
            width,
          },
      style,
    ] as any,

    // adapter for older versions of RN
    // https://github.com/facebook/react-native/blob/main/Libraries/Image/Image.android.js#L169-L194
    accessibilityLabel: props['aria-label'] ?? alt,
    accessibilityState: {
      busy: booleanish(props['aria-busy']),
      checked: booleanish(props['aria-checked']),
      disabled: booleanish(props['aria-disabled']),
      expanded: booleanish(props['aria-expanded']),
      selected: booleanish(props['aria-selected']),
    },
  }
}

function booleanish<Value extends string | boolean>(value?: Value) {
  // this should get upstreamed in RN
  return (
    value === 'true' ? true : value === 'false' ? false : value
  ) as Exclude<Value, 'true' | 'false'>
}

import { useMemo, useSyncExternalStore } from 'react'
import { ImageProps, Dimensions, StyleSheet } from 'react-native'

import { defaultLoader } from './default-loader'
import {
  generateImgAttrs,
  getInt,
  imageConfigDefault,
  resolveSourceFromImgAttributes,
} from './helpers'
import { SolitoImageProps } from './image.types'
import { ImageConfig } from './types'

export function useSolitoImage({
  src,
  loader,
  width,
  height,
  quality = 0.75,
  crossOrigin,
  referrerPolicy,
  alt,
  fill,
  onLoadingComplete,
  loading,
  priority,
  placeholder,
  blurDataURL,
  sizes,
  style,
  onLayout,
  unoptimized,
  ...props
}: SolitoImageProps): ImageProps {
  const config: ImageConfig = useMemo(() => {
    const c = imageConfigDefault
    const allSizes = [...c.deviceSizes, ...c.imageSizes].sort((a, b) => a - b)
    const deviceSizes = c.deviceSizes.sort((a, b) => a - b)
    return { ...c, allSizes, deviceSizes }
  }, [])

  const finalSource = useSyncExternalStore<ImageProps['source']>(
    (callback) => Dimensions.addEventListener('change', callback).remove,
    () => {
      const headers: { [key in string]: string } = {}
      if (crossOrigin === 'use-credentials') {
        headers['Access-Control-Allow-Credentials'] = 'true'
      }
      if (referrerPolicy != null) {
        headers['Referrer-Policy'] = referrerPolicy
      }
      let source: ImageProps['source'] = src

      const dimensions = Dimensions.get('window')

      if (typeof src == 'string') {
        const attrs = generateImgAttrs({
          src,
          config,
          loader: (obj) => {
            const { config: _, ...opts } = obj as any
            if (loader) {
              return loader(opts)
            }
            return defaultLoader({ ...obj, config: imageConfigDefault })
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

        return {
          uri,
          height,
          width,
          headers,
          cache: priority ? 'force-cache' : 'default',
        }
      } else {
        source = src
      }

      return source
    }
  )

  return {
    ...props,
    progressiveRenderingEnabled: true,
    onLoad: ({ nativeEvent, ...rest }) =>
      onLoadingComplete?.({
        width: nativeEvent.source.width,
        height: nativeEvent.source.height,
        ...(rest as any),
      }),
    source: finalSource,
    accessible: Boolean(alt),
    onLayout,
    style: [fill && StyleSheet.absoluteFill, style],

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

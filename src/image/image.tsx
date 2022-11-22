import { useMemo, useSyncExternalStore } from 'react'
import { Image, ImageProps, Dimensions, StyleSheet } from 'react-native'

import { defaultLoader } from './default-loader'
import {
  generateImgAttrs,
  getInt,
  imageConfigDefault,
  resolveSourceFromImgAttributes,
} from './helpers'
import { SolitoImageProps } from './image.types'
import { ImageConfig } from './types'

export function SolitoImage({
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
}: SolitoImageProps) {
  let progressiveRenderingEnabled = false

  const config: ImageConfig = useMemo(() => {
    const c = imageConfigDefault
    const allSizes = [...c.deviceSizes, ...c.imageSizes].sort((a, b) => a - b)
    const deviceSizes = c.deviceSizes.sort((a, b) => a - b)
    return { ...c, allSizes, deviceSizes }
  }, [])

  const headers: { [key in string]: string } = {}
  if (crossOrigin === 'use-credentials') {
    headers['Access-Control-Allow-Credentials'] = 'true'
  }
  if (referrerPolicy != null) {
    headers['Referrer-Policy'] = referrerPolicy
  }
  const finalSource = useSyncExternalStore(
    (callback) => Dimensions.addEventListener('change', callback).remove,
    () => {
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
        const { uri, scale } = resolveSourceFromImgAttributes({
          ...attrs,
          dimensions,
        })

        return {
          uri,
          scale,
        }
      } else {
        source = src
      }

      return source
    }
  )

  return (
    <Image
      source={finalSource}
      progressiveRenderingEnabled={progressiveRenderingEnabled}
      accessible={Boolean(alt)}
      style={[fill && StyleSheet.absoluteFill, style]}
      onLoad={({ nativeEvent, ...rest }) =>
        onLoadingComplete?.({
          width: nativeEvent.source.width,
          height: nativeEvent.source.height,
          ...(rest as any),
        })
      }
      {...{
        // adapter for older versions of RN
        // https://github.com/facebook/react-native/blob/main/Libraries/Image/Image.android.js#L169-L194
        accessibilityLabel: props['aria-label'] ?? alt,
        accessibilityLabelledBy: props?.['aria-labelledby'],
        accessibilityState: {
          busy: booleanish(props['aria-busy']),
          checked: booleanish(props['aria-checked']),
          disabled: booleanish(props['aria-disabled']),
          expanded: booleanish(props['aria-expanded']),
          selected: booleanish(props['aria-selected']),
        },
      }}
      onLayout={onLayout}
    />
  )
}

function booleanish<Value extends string | boolean>(value?: Value) {
  // this should get upstreamed in RN
  return (
    value === 'true' ? true : value === 'false' ? false : value
  ) as Exclude<Value, 'true' | 'false'>
}

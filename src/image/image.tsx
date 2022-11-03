import React from 'react'
import { Image, ImageURISource, StyleSheet } from 'react-native'

import { SolitoImageProps } from './image.types'

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
  sizes = '100vw',
  style,
  onLayout,
  ...props
}: SolitoImageProps) {
  let source: React.ComponentProps<typeof Image>['source']
  let progressiveRenderingEnabled = false

  if (sizes) {
    const sizeSet = sizes.split(',').map((size) => size.trim())
    sizeSet.forEach((sizeChunk) => {
      if (sizeChunk.includes(' ')) {
        const [size, descriptor] = sizeChunk.split(' ')
        // TODO what is the correct approach here? should we generate the srcSet based on this from screen sizes?
      }
    })
  }

  const headers: { [key in string]: string } = {}
  if (crossOrigin === 'use-credentials') {
    headers['Access-Control-Allow-Credentials'] = 'true'
  }
  if (referrerPolicy != null) {
    headers['Referrer-Policy'] = referrerPolicy
  }
  if (typeof src == 'string') {
    // TODO next/image uses srcSet from image sizes and screen sizes right?
    // but here we're saying that only scale is supported
    // however, that doesn't seem right
    // also, where is the sizes prop in all this?

    let srcSet = '' // TODO how do we generate this? from the config?
    if (srcSet) {
      // https://github.com/facebook/react-native/blob/main/Libraries/Image/Image.ios.js
      const sourceList: ImageURISource[] = []
      const srcSetList = srcSet.split(', ')
      // `src` prop should be used with default scale if `srcSet` does not have 1x scale.
      let shouldUseSrcForDefaultScale = true
      srcSetList.forEach((imageSrc) => {
        const [uri, xScale = '1x'] = imageSrc.split(' ')
        if (!xScale.endsWith('x')) {
          console.warn(
            '[solito/image] The provided format for scale in the srcSet is not supported yet. Please use scales like 1x, 2x, etc.'
          )
        } else {
          const scale = parseInt(xScale.split('x')[0], 10)
          if (!isNaN(scale)) {
            // 1x scale is provided in `srcSet` prop so ignore the `src` prop if provided.
            shouldUseSrcForDefaultScale =
              scale === 1 ? false : shouldUseSrcForDefaultScale
            sourceList.push({ headers, scale, uri, width, height })
          }
        }
      })

      if (shouldUseSrcForDefaultScale && src != null) {
        sourceList.push({
          headers,
          scale: 1,
          uri:
            (width && loader?.({ src, quality: Number(quality), width })) ||
            src,
          width,
          height,
          cache: priority ? 'force-cache' : 'default',
        })
      }
      if (sourceList.length === 0) {
        console.warn('The provided value for srcSet is not valid.')
      }

      source = sourceList
    } else {
      progressiveRenderingEnabled = true

      source = {
        uri:
          (width && loader?.({ src, quality: Number(quality), width })) || src,
        height,
        width,
        headers,
        cache: priority ? 'force-cache' : 'default',
      }
    }
  } else {
    source = src
  }

  return (
    <Image
      source={source}
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

function booleanish<Value>(value?: Value) {
  // this should get upstreamed in RN
  return (
    value === 'true' ? true : value === 'false' ? false : value
  ) as Exclude<Value, 'true' | 'false'>
}

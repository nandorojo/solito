import { defaultLoader } from './default-loader'

import { ImageConfig, ImageConfigComplete } from './types'

export type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

function getWidths(
  { deviceSizes, allSizes }: ImageConfig,
  width: number | undefined,
  sizes: string | undefined
): { widths: number[]; kind: 'w' | 'x' } {
  if (sizes) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g
    const percentSizes = []
    for (let match; (match = viewportWidthRe.exec(sizes)); match) {
      percentSizes.push(parseInt(match[2], 10))
    }
    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01
      return {
        widths: allSizes.filter((s) => s >= deviceSizes[0] * smallestRatio),
        kind: 'w',
      }
    }
    return { widths: allSizes, kind: 'w' }
  }
  if (typeof width !== 'number') {
    return { widths: deviceSizes, kind: 'w' }
  }

  const widths = [
    ...new Set(
      // > This means that most OLED screens that say they are 3x resolution,
      // > are actually 3x in the green color, but only 1.5x in the red and
      // > blue colors. Showing a 3x resolution image in the app vs a 2x
      // > resolution image will be visually the same, though the 3x image
      // > takes significantly more data. Even true 3x resolution screens are
      // > wasteful as the human eye cannot see that level of detail without
      // > something like a magnifying glass.
      // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
      [width, width * 2 /*, width * 3*/].map(
        (w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1]
      )
    ),
  ]
  return { widths, kind: 'x' }
}

type GenImgAttrsData = {
  config: ImageConfig
  src: string
  unoptimized: boolean
  loader: typeof defaultLoader
  // | NonNullable<React.ComponentProps<typeof NextImage>['loader']>
  width?: number
  quality?: number
  sizes?: string
}

type GenImgAttrsResult = {
  src: string
  srcSet: string | undefined
  sizes: string | undefined
}

export function getInt(x: unknown): number | undefined {
  if (typeof x === 'number' || typeof x === 'undefined') {
    return x
  }
  if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
    return parseInt(x, 10)
  }
  return NaN
}

export function generateImgAttrs({
  config,
  src,
  unoptimized,
  width,
  quality,
  sizes,
  loader,
}: GenImgAttrsData): GenImgAttrsResult {
  if (unoptimized) {
    return { src, srcSet: undefined, sizes: undefined }
  }

  const { widths, kind } = getWidths(config, width, sizes)
  const last = widths.length - 1

  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths
      .map(
        (w, i) =>
          `${loader({ src, quality, width: w, config })} ${
            kind === 'w' ? w : i + 1
          }${kind}`
      )
      .join(', '),

    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({ quality, width: widths[last], src, config }),
  }
}

export const resolveSourceFromImgAttributes = ({
  src,
  srcSet,
  sizes,
  dimensions,
}: {
  src: string
  srcSet?: string
  sizes?: string
  dimensions: {
    width: number
    height: number
  }
}): { uri: string } => {
  try {
    if (srcSet) {
      const getVw = (size: string) => {
        return (parseInt(size.replace('vw', ''), 10) * dimensions.width) / 100
      }
      const getPix = (size: string) => {
        return parseInt(size.replace('px', ''), 10)
      }
      const getVwOrPix = (size: string) => {
        if (size.includes('vw')) {
          return getVw(size)
        }
        return getPix(size)
      }
      const getSize = (size: string): number => {
        if (size.includes(')')) {
          return getVwOrPix(size.split(')')[1])
        }
        if (size.endsWith('vw')) {
          return getVw(size)
        }
        return getPix(size)
      }

      const sizeSet = sizes?.split(',') ?? []

      let size = getSize(sizeSet[sizeSet.length - 1] || `100vw`)
      for (let sizeChunk of sizeSet) {
        sizeChunk = sizeChunk.trim()

        // regex to check for (min-width: or (max-width:
        const mediaQueryRegex = /(\(min-width:|\(max-width:)/
        const mediaQueryCondition = mediaQueryRegex.test(sizeChunk)

        if (mediaQueryCondition) {
          // the string looks like this: (max-width: 600px) 480px
          // extract pixels from media query, and then say if it's min or max-width
          // finally, get the pixels to the right as the actual sizeValue

          const minOrMax = sizeChunk.includes('min') ? 'min' : 'max'
          const heightOrWidth = sizeChunk.includes('-height')
            ? 'height'
            : 'width'

          const sizeString = sizeChunk
            .replace(mediaQueryRegex, '')
            .split(')')[1]
            .trim()

          const mediaQuerySize = sizeString.includes('px')
            ? parseInt(sizeString.replace('px', ''), 10)
            : sizeString.includes('vw')
            ? (parseInt(sizeString.replace('vw', ''), 10) / 100) *
              dimensions.width
            : null

          if (mediaQuerySize === null) {
            throw new Error(
              '[solito/image] Invalid condition passed to sizes (${sizes}). ${size} does not end in px or vw'
            )
          }

          let matches = false

          if (minOrMax === 'min') {
            matches = dimensions[heightOrWidth] >= mediaQuerySize
          } else if (minOrMax === 'max') {
            matches = dimensions[heightOrWidth] <= mediaQuerySize
          }

          if (matches) {
            size = mediaQuerySize
            break
          }
        }
      }

      const sources = srcSet.split(', ').map((source) => {
        const [sourceUrl, size] = source.trim().split(' ')

        if (size.endsWith('x')) {
          // throw new Error(
          //   `[solito/image] srcSet does not support x descriptors, but it got "${size}" inside of ${srcSet}`
          // )

          // TODO what is the right way to handle 1x, 2x sizes?

          return {
            sourceUrl,
            size: parseInt(size.replace('x', ''), 10) * dimensions.width, // should this use image width?
          }
        }

        return {
          sourceUrl,
          size: parseInt(size.replace('w', ''), 10),
        }
      })

      const firstSourceThatMatchesforSize = sources.find(
        (source) => source.size >= size
      )

      if (firstSourceThatMatchesforSize) {
        return { uri: firstSourceThatMatchesforSize.sourceUrl }
      }
    }

    return {
      uri: src,
    }
  } catch (e: any) {
    throw new Error(
      `[solito/image] Error parsing srcSet & sizes: ${
        e?.message || 'unknown error.'
      }. ${JSON.stringify({ src, srcSet, sizes })}`
    )
  }
}

export const imageConfigDefault: ImageConfigComplete = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  path: '/_next/image',
  //   loader: 'default',
  //   loaderFile: '',
  //   domains: [],
  //   disableStaticImages: false,
  //   minimumCacheTTL: 60,
  //   formats: ['image/webp'],
  //   dangerouslyAllowSVG: false,
  //   contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
  //   remotePatterns: [],
  //   unoptimized: false,
}

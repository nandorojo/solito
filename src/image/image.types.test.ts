import type NextImage from 'next/image'

import { SolitoImageProps } from './image.types'

type NextImageProps = React.ComponentProps<typeof NextImage>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test: Array<SolitoImageProps> = [
  {
    src: '',
    height: 100,
    width: 100,
    alt: '',
  },
  {
    unoptimized: true,
    src: '',
    height: 100,
    width: 100,
    alt: '',
  },
  {
    src: null as any as Exclude<NextImageProps['src'], string>,
    height: 100,
    width: 100,
    alt: '',
  },
  {
    src: 1,
    alt: '',
  },
]

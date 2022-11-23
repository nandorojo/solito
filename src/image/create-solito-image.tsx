import React, { ComponentType, createElement, forwardRef } from 'react'

import { SolitoImageProps } from './image.types'
import { useSolitoImage } from './use-solito-image'

export function createSolitoImage<
  C extends ComponentType<ReturnType<typeof useSolitoImage>>
>(Component: C) {
  return forwardRef<React.ElementRef<C>, SolitoImageProps>(function Img(
    props,
    ref
  ) {
    const imageProps = useSolitoImage(props)
    return createElement(Component, { ...imageProps, ref } as any)
  })
}

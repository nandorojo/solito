'use client'
import React from 'react'
import type { ComponentProps } from 'react'
import { NextLink } from './next-link'

export type LinkCoreProps = {
  children: React.ReactNode
} & Omit<
  ComponentProps<typeof NextLink>,
  'passHref' | 'replace' | 'legacyBehavior'
> &
  (
    | {
        replace?: false
        experimental?: undefined
      }
    | {
        replace: true
        experimental?: {
          nativeBehavior: 'stack-replace'
          isNestedNavigator: boolean
        }
      }
  )

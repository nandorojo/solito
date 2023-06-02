// @ts-nocheck
'use client'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleSheet } from 'react-native'

export function StylesProvider({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => StyleSheet.getSheet())
  return <>{children}</>
}

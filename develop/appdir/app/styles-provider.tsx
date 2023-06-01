'use client'
import { Main } from 'next/document'
import { useServerInsertedHTML } from 'next/navigation'
import { AppRegistry } from 'react-native'

export function StylesProvider({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    return getStyleElement()
  })
  return <>{children}</>
}

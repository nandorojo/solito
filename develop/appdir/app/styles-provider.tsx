'use client'
import { Main } from 'next/document'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'
import { AppRegistry } from 'react-native'

export function StylesProvider({ children }: { children: React.ReactNode }) {
    const [getStyleElement] = useState(() => {
      AppRegistry.registerComponent('Main', () => Main)
      // @ts-ignore
      const { getStyleElement } = AppRegistry.getApplication('Main')
  
      return getStyleElement
    })
    useServerInsertedHTML(() => {
      return getStyleElement()
    })
    return <>{children}</>
  }
  return <>{children}</>
}

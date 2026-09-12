'use client'

import { TextLink } from 'solito/link'
import { Text, View } from 'react-native'

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-blue-300 p-4">
      <H1>Welcome to Solito.</H1>
      <View className="max-w-lg gap-4">
        <P>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </P>
        <P>
          Solito is made by{' '}
          <TextLink
            href="https://twitter.com/fernandotherojo"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Fernando Rojo
          </TextLink>
          .
        </P>
      </View>
      <View className="flex-row gap-8">
        <TextLink
          href="/users/fernando"
          className="text-base font-bold text-blue-500"
        >
          Link
        </TextLink>
      </View>
    </View>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <Text className="text-2xl font-extrabold">{children}</Text>
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <Text className="text-center">{children}</Text>
}

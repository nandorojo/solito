'use client'
import { Text, View } from 'react-native'
import { MotiLink } from 'solito/moti/app'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <MotiLink
        from={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        href="/users/fernando?search=hey!"
      >
        <Text>Hello, Next.js App Router.</Text>
      </MotiLink>
    </View>
  )
}

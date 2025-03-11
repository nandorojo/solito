'use client'

// export { HomeScreen as default } from 'app/features/home/screen'
import { Text, View } from 'react-native'
import { Link } from 'solito/link'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/users/fernando?search=hey!">
        <Text>Hello, Next.js App Router.</Text>
      </Link>
    </View>
  )
}

'use client'
import { Text, View } from 'react-native'
import { useParams, useRouter } from 'solito/navigation'

const useUserParams = useParams<{ userId: string }>

export default function Home() {
  const { userId } = useUserParams()
  const router = useRouter()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => router.back()}>
        Hi {userId}, click me to go back
      </Text>
    </View>
  )
}

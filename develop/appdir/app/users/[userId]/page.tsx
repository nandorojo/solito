'use client'
import { Text, View } from 'react-native'
import { useParams, useRouter, useSearchParams } from 'solito/navigation'

const useUserParams = useParams<{ userId: string }>

export default function Home() {
  const { userId } = useUserParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => router.back()}>
        {userId}, here is the search param: {searchParams?.get('search')}
      </Text>
    </View>
  )
}

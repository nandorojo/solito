import { View, Text, Pressable } from 'react-native'
import { useRouter, useSearchParams } from 'solito/navigation'

export function UserDetailScreen() {
  const router = useRouter()
  const params = useSearchParams()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={() => router.back()}>
        <Text>👈 welcome, {params?.get('id')}! (press me to go back)</Text>
      </Pressable>
    </View>
  )
}

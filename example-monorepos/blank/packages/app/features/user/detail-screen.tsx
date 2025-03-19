import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'solito/navigation'

export function UserDetailScreen() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable onPress={() => router.back()}>
        <Text>👈 Go Home</Text>
      </Pressable>
    </View>
  )
}

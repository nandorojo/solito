import { Text, useSx, View } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import { Pressable } from 'react-native'
import { MotiPressable } from 'moti/interactions'
import { useRouter } from 'next/router'

export function HomeScreen() {
  const router = useRouter()
  const sx = useSx()
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextLink
        href="/user/fernando"
        textProps={{
          style: sx({ fontSize: 16, fontWeight: 'bold', color: '#ff930a' }),
        }}
      >
        Regular Link
      </TextLink>
      <View sx={{ height: 32 }} />
      <MotiLink
        href="/user/fernando"
        animate={({ hovered, pressed }) => {
          'worklet'

          return {
            scale: pressed ? 0.95 : hovered ? 1.1 : 1,
          }
        }}
        transition={{
          // fast spring transition config
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 1,
        }}
      >
        <Text
          selectable={false}
          sx={{ fontSize: 16, color: 'blue', fontWeight: 'bold' }}
        >
          Animated Moti Link
        </Text>
      </MotiLink>
    </View>
  )
}

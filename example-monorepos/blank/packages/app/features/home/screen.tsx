import { Text, useSx, View } from 'dripsy'
import { useRouter } from 'next/router'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'

export function HomeScreen() {
  const router = useRouter()
  const sx = useSx()
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextLink
        href="/user/fernando"
        textProps={{
          style: sx({ fontSize: 16, fontWeight: 'bold', color: 'blue' }),
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
            scale: pressed ? 0.95 : hovered ? 1.3 : 1,
            rotateZ: pressed ? '0deg' : hovered ? '-5deg' : '0deg',
          }
        }}
        transition={{
          // faster spring transition config
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <Text
          selectable={false}
          sx={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}
        >
          Animated Moti Link
        </Text>
      </MotiLink>
    </View>
  )
}

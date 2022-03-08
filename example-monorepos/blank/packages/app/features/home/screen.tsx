import { useSx, View } from 'dripsy'
import { MotiView } from 'moti'
import { TextLink } from 'solito/link'

export function HomeScreen() {
  const sx = useSx()
  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
      >
        <TextLink
          href="/user/fernando"
          textProps={{ style: sx({ fontSize: 16, fontWeight: 'bold' }) }}
        >
          Open User 🧍
        </TextLink>
      </MotiView>
    </View>
  )
}

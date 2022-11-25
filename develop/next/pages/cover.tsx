import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

export default function CoverPage() {
  return (
    <View style={{ flex: 1 }}>
      <SolitoImage
        alt="Mountain"
        src="/mountains.jpg"
        quality={100}
        fill
        priority
        sizes="100vw"
        resizeMode="cover"
      />
    </View>
  )
}

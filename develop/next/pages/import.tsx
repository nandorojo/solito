import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

import mountains from '../public/mountains.jpg'

export default function ImportPage() {
  return (
    <View style={{ flex: 1 }}>
      <SolitoImage
        alt="Mountain"
        src={mountains}
        quality={100}
        fill
        priority
        sizes="100vw"
        resizeMode="cover"
      />
    </View>
  )
}

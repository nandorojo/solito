import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'blue',
      }}
    >
      <SolitoImage
        alt=""
        unoptimized
        src="https://dice-media.imgix.net/attachments/2022-10-05/b2738fef-45c4-4e02-a88c-0972eb825afd.jpg?rect=0%2C0%2C1920%2C1920&auto=format%2Ccompress&q=40&w=328&fit=max&dpr=2"
        width={300}
        height={300}
        style={{
          borderRadius: 10,
        }}
        onLayout={console.log}
      />
    </View>
  )
}

'use client'

import { A, Text } from "app/design/typography"
import { View } from "app/design/view"



export function HomePage() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-3">
      <View className="max-h-md w-full max-w-lg gap-y-4 rounded-md bg-white p-4">
        <Text className="text-center text-3xl font-medium">
          Welcome✌️
        </Text>
        <Text className="text-center text-2xl font-light">
          Solito👍 + Expo SDK51📱+ Expo Router 3 + NextJS14💻 + NativeWindCSS🪶
        </Text>
        <Text className="text-center text-2xl font-bold">
          Template
        </Text>
        <A href="https://github.com/KitKat1996" className="text-right text-sm font-light">
          Created by KitKat🍫
        </A>
      </View>
    </View>
  )
}

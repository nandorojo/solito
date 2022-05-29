import React from 'react'
import { createParam } from 'solito'
import { TextLink } from 'solito/link'
import { View } from 'components/layout'
import { Text } from 'components/typography'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-center font-bold mb-4">{`User ID: ${id}`}</Text>
      <TextLink href="/">👈 Go Home</TextLink>
    </View>
  )
}

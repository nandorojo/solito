import { ComponentProps } from 'react'
import { View as RNView } from 'react-native'
import { styled } from 'tailwindcss-react-native'

export const View = styled(RNView)

/**
 * You can use this pattern to create custom layouts
 */
export const Row = ({ className, ...props }: ComponentProps<typeof View>) => (
  <View className={`flex-row ${className}`} {...props} />
)

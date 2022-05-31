import { View as RNView } from 'react-native'
import { styled } from 'tailwindcss-react-native'

export const View = styled(RNView)

export const Row = styled(RNView)
Row.defaultProps = {
  baseClassName: "flex-row"
}

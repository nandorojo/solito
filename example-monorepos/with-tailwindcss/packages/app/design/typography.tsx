import { ComponentProps, forwardRef } from 'react'
import {
  Text as RNText,
  Platform,
  Linking,
  TextStyle,
} from 'react-native'
import { styled } from 'tailwindcss-react-native'
import { TextLink as SolitoTextLink } from 'solito/link'

export const Text = styled(RNText)

/**
 * You can use this pattern to create components with default styles
 */
export const P = styled(RNText)
P.defaultProps = {
  baseClassName: 'text-base text-black my-4',
}

/**
 * Or to create components with default styles and props
 */
export const H1 = styled(RNText)
H1.defaultProps = {
  accessibilityLevel: 1,
  accessibilityRole: 'header',
  baseClassName: 'text-3xl font-extrabold my-4',
}

/**
 * This is a more advanced component with custom styles and per-platform functionality
 */
export interface AProps extends ComponentProps<typeof Text> {
  href?: string
  target?: string
}

export const A = forwardRef<RNText, AProps>(function A(
  { href, target, ...props },
  ref
) {
  const nativeAProps = Platform.select<Partial<AProps>>({
    web: {
      href,
      target,
    },
    default: {
      onPress: (event) => {
        props.onPress && props.onPress(event)
        if (Platform.OS !== 'web' && href !== undefined) {
          Linking.openURL(href)
        }
      },
    },
  })

  return <Text {...props} {...nativeAProps} ref={ref} />
})
A.defaultProps = {
  accessibilityRole: 'link',
  baseClassName: 'text-blue-500 hover:underline',
}

/**
 * Solito's TextLink doesn't quite work with styled(), so you need to wrap it in a function
 * to correctly pass the style prop.
 */
export const TextLink = styled<ComponentProps<typeof SolitoTextLink> & { style?: TextStyle }>(
  ({
    style,
    textProps,
    ...props
  }) => (
    <SolitoTextLink textProps={{ style, ...textProps }} {...props} />
  ),
)
TextLink.defaultProps = {
  baseClassName: 'text-base font-bold hover:underline text-blue-500'
}

import { ComponentProps, forwardRef } from 'react'
import {
  Text as RNText,
  TextStyle,
  TextProps,
  Platform,
  Linking,
} from 'react-native'
import { styled, StyledProps } from 'tailwindcss-react-native'
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
export interface AProps extends TextProps {
  href?: string
  target?: string
}

const StyledA = styled(RNText)
StyledA.defaultProps = {
  accessibilityRole: 'link',
  baseClassName: 'text-blue-500 hover:underline',
}

export const A = forwardRef<RNText, StyledProps<AProps>>(function A(
  { className = '', href, target, ...props },
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

  return <StyledA {...props} {...nativeAProps} ref={ref} />
})

/**
 * Solito's TextLink doesn't quite work with styled(), so you need to wrap it in a function
 * to correctly pass the arguments.
 *
 * This is a common pattern when working with libraries
 */
export const TextLink = styled(
  ({
    style,
    textProps,
    ...props
  }: ComponentProps<typeof SolitoTextLink> & { style?: TextStyle }) => (
    <SolitoTextLink textProps={{ style, ...textProps }} {...props} />
  ),
)
TextLink.defaultProps = {
  baseClassName: 'text-base font-bold hover:underline text-blue-500'
}

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
export const P = forwardRef<RNText, StyledProps<TextProps>>(function P(
  { className = '', ...props },
  ref
) {
  return <Text className={`text-base my-4 ${className}`} {...props} ref={ref} />
})

/**
 * You can use this pattern works well when creating different typography components
 */
export const H1 = forwardRef<RNText, StyledProps<TextProps>>(function H1(
  { className = '', ...props },
  ref
) {
  return (
    <Text
      accessibilityLevel={3}
      accessibilityRole="header"
      className={`text-3xl font-extrabold my-4 ${className}`}
      {...props}
      ref={ref}
    />
  )
})

/**
 * This more advanced component with custom styles and functionality
 */
export interface AProps extends TextProps {
  href?: string
  target?: string
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

  return (
    <Text
      accessibilityRole="link"
      className={`text-blue-500 hover:underline ${className}`}
      {...props}
      {...nativeAProps}
      ref={ref}
    />
  )
})

/**
 * Solito's TextLink doesn't quite work with styled(), so you need to wrap it in a function
 * Now you can pass the outputed style to the textProps
 */
const StyledTextLink = styled(
  ({
    style,
    textProps,
    ...props
  }: ComponentProps<typeof SolitoTextLink> & { style?: TextStyle }) => (
    <SolitoTextLink textProps={{ style, ...textProps }} {...props} />
  )
)

/**
 * Now we can create our TextLink using StyledTextLink.
 */
export const TextLink = forwardRef<
  RNText,
  ComponentProps<typeof StyledTextLink>
>(function TextLink({ className = '', ...props }, ref) {
  return (
    <StyledTextLink
      className={`text-base font-bold hover:underline text-blue-500 ${className}`}
      {...props}
      ref={ref}
    />
  )
})

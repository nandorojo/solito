import { ComponentProps, forwardRef } from 'react'
import { Text as RNText, Platform, Linking, TextStyle } from 'react-native'
import { styled, StyledProps } from 'nativewind'
import { TextLink as SolitoTextLink } from 'solito/link'

export const Text = styled(RNText)

/**
 * You can use this pattern to create components with default styles
 */
export const P = styled(RNText, 'text-base text-black my-4')

/**
 * Components can have defaultProps and styles
 */
export const H1 = styled(RNText, 'text-3xl font-extrabold my-4')
H1.defaultProps = {
  accessibilityLevel: 1,
  accessibilityRole: 'header',
}

/**
 * This is a more advanced component with custom styles and per-platform functionality
 */
export interface AProps extends ComponentProps<typeof Text> {
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
 * to correctly pass the style prop.
 */
export const TextLink = styled<
  ComponentProps<typeof SolitoTextLink> & { style?: TextStyle }
>(
  ({ style, textProps, ...props }) => (
    <SolitoTextLink textProps={{ style, ...textProps }} {...props} />
  ),
  'text-base font-bold hover:underline text-blue-500'
)

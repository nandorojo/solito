import { styled } from 'nativewind'
import { forwardRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import { Touchable, TouchableOpacityProps } from 'react-native'

interface IButton extends TouchableOpacityProps {
  isDisable ? : boolean
  textClass ?: string
}

const StyledButton = styled(
  TouchableOpacity,
  'flex h-[44px] rounded-md border justify-center items-center hover:bg-gray-50',
)

const StyledText = styled(Text)


const Button = forwardRef<TouchableOpacity, IButton>((props, ref) => {
  return (
    <StyledButton className={props.isDisable ? "bg-gray-100 border-gray-600" : ""} ref={ref} {...props} >
      <StyledText className={props.textClass ? props.textClass : `text-center text-lg font-bold ${ props.isDisable ? "text-gray-500" : "text-black"}`}>
        {props.children}
      </StyledText>
    </StyledButton>
  )
})

Button.displayName = 'Button'

export default Button

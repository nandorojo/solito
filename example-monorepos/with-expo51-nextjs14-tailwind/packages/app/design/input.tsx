import { styled } from 'nativewind'
import React, { forwardRef } from 'react'
import { Text } from 'react-native'
import { TextInput, TextInputProps } from 'react-native'
import { View } from './view'

const StyledTextInput = styled(
  TextInput,
  'w-full px-2 h-[40px] border border-gray-300 rounded-md outline-none m-0',
)

const StyledText = styled(
  Text,
  'text-gray-950 text-sm font-medium',
)


interface InputProps extends TextInputProps {}

// Tipagem correta para forwardRef
const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  return <StyledTextInput ref={ref} {...props} />
})

Input.displayName = 'Input'

interface InputFormProps extends TextInputProps {
    label ? : string
    error ? : string
    helper ? : string
    icon ?: React.ReactElement
}


const InputForm = forwardRef<TextInput , InputFormProps>((props, ref) => {
  return (
  <View className='w-full flex-col relative'>
    {
        props.label &&
        <StyledText className='text-gray-500 text-xs font-bold'>
            {props.label}
        </StyledText>
    }
    <View className='w-full flex-row gap-0'>
      <Input ref={ref} {...props} /> 
      {
        props.icon &&
        <View className='w-[40px] h-[40px] flex-row justify-center items-center absolute right-2'>
          {
            props.icon
          }
        </View>
      }
    </View>
    
    {
        props.error &&
        <StyledText className='text-gray-500 text-xs font-medium'>
            {props.error}
        </StyledText>
    }
    {
        props.helper &&
        <StyledText className='text-red-500 text-xs font-medium'>
            {props.helper}
        </StyledText>
    }
  </View>
  )
})

InputForm.displayName = 'InputForm'

export {Input ,InputForm}
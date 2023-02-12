import { useCallback, useState } from 'react'

import { useNavigation } from '../router/use-navigation'
import { Params, Returns, UpdateOptions } from './types'
import { useRoute } from './use-route'

export function createParam<
  Props extends Record<string, unknown> = Record<string, string>
>() {
  function useParam<
    Name extends keyof Props,
    NullableUnparsedParsedType extends Props[Name] | undefined =
      | Props[Name]
      | undefined,
    ParseFunction extends
      | undefined
      | ((
          value?: string | string[]
        ) => NonNullable<NullableUnparsedParsedType>) = (
      value?: string | string[]
    ) => NonNullable<NullableUnparsedParsedType>,
    InitialValue = NullableUnparsedParsedType | undefined,
    ParsedType = InitialValue extends undefined
      ? NullableUnparsedParsedType
      : ParseFunction extends undefined
      ? NullableUnparsedParsedType
      : NonNullable<NullableUnparsedParsedType>
  >(
    ...[name, maybeConfig]: Params<
      Props,
      Name,
      NullableUnparsedParsedType,
      ParseFunction,
      InitialValue,
      ParsedType
    >
  ): Returns<
    Props,
    Name,
    NullableUnparsedParsedType,
    ParseFunction,
    InitialValue,
    ParsedType
  > {
    const { initial } = maybeConfig || {}
    const nativeRoute = useRoute()
    const nativeNavigation = useNavigation()
    const nativeStateFromParams = (nativeRoute?.params as any)?.[
      name
    ] as ParsedType

    const [nativeStateFromReact, setNativeStateFromReact] = useState<
      ParsedType | InitialValue
    >(() => nativeStateFromParams ?? (initial as InitialValue))

    const setNativeStateFromParams = useCallback((value: ParsedType) => {
      nativeNavigation?.setParams({
        [name]: value,
      })
    }, [])

    const nativeState = nativeRoute
      ? nativeStateFromParams
      : nativeStateFromReact
    const setNativeState = nativeRoute
      ? setNativeStateFromParams
      : setNativeStateFromReact

    if (!nativeRoute) {
      console.error(
        `[solito] useParam('${
          name as string
        }') called when there is no React Navigation route available. In a future version, this will throw an error. Please fix this by only calling useParam() inside of a React Navigation route. For now, Solito will fallback to using React state.`
      )
    }
    return [nativeState, setNativeState]
  }

  function useUpdateParams(): (
    props: Partial<Props>,
    options?: UpdateOptions
  ) => void {
    const nativeNavigation = useNavigation()

    const setNativeStateFromParams = useCallback((value: Partial<Props>) => {
      nativeNavigation?.setParams(value)
    }, [])

    return setNativeStateFromParams
  }

  return {
    useParam,
    useUpdateParams,
  }
}

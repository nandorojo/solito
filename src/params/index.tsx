/* eslint-disable react-hooks/rules-of-hooks */
// From https://gist.github.com/nandorojo/052887f99bb61b54845474f324aa41cc

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'

import { useNavigation } from '../router/use-navigation'
import Router from './router'
import { useRoute } from './use-route'
import { useRouter } from './use-router'

function useStable<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

function useStableCallback<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}

type Config<
  Props extends Record<string, unknown>,
  Required extends boolean,
  ParsedType,
  InitialValue
> = (Required extends false
  ? {
      parse?: (value?: string | string[]) => ParsedType
    }
  : {
      parse: (value?: string | string[]) => ParsedType
    }) & {
  stringify?: (value: ParsedType) => string
  initial: InitialValue
  paramsToClearOnSetState?: (keyof Props)[]
}

type Params<
  Props extends Record<string, unknown> = Record<string, string>,
  Name extends Extract<keyof Props, string> = Extract<keyof Props, string>,
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
> = NonNullable<ParsedType> extends string
  ?
      | [name: Name, config: Config<Props, false, ParsedType, InitialValue>]
      | [name: Name]
  : [name: Name, config: Config<Props, true, ParsedType, InitialValue>]

type Returns<
  Props extends Record<string, unknown> = Record<string, string>,
  Name extends keyof Props = keyof Props,
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
> = readonly [
  state: ParsedType | InitialValue,
  setState: (value: ParsedType, options?: SetStateOptions) => void
]

type SetStateOptions = {
  /**
   * Override whether this function calls `Router.push` or `Router.replace`.
   *
   * By default, `Router.push` is called if the query parameter already exists in the URL.
   */
  webBehavior?: 'push' | 'replace'
}

export function createParam<
  Props extends Record<string, unknown> = Record<string, string>
>() {
  function useParam<
    Name extends Extract<keyof Props, string>,
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
    const {
      parse = (value?: string | string[]) => value,
      initial,
      stringify,
      paramsToClearOnSetState,
    } = maybeConfig || {}
    const nextRouter = useRouter()
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

    const stableStringify = useStable(stringify)
    const stableParse = useStableCallback(parse)
    const stableParamsToClear = useStable(paramsToClearOnSetState)

    const initialValue = useRef(initial)
    const hasSetState = useRef(false)

    const setState = useCallback(
      (value: ParsedType, options?: SetStateOptions) => {
        hasSetState.current = true
        const { pathname, query } = Router
        const newQuery = { ...query }
        if (value != null && (value as any) !== '') {
          if (stableStringify.current) {
            newQuery[name] = stableStringify.current(value)
          } else {
            newQuery[name] = value as any
          }
        } else {
          delete newQuery[name]
        }

        if (stableParamsToClear.current) {
          for (const paramKey of stableParamsToClear.current) {
            delete newQuery[paramKey as string]
          }
        }

        const willChangeExistingParam = query[name] && newQuery[name]

        let action = willChangeExistingParam ? Router.replace : Router.push

        if (options?.webBehavior) {
          action = Router[options.webBehavior]
        }

        action(
          {
            pathname,
            query: newQuery,
          },
          undefined,
          {
            shallow: true,
          }
        )
      },
      [name, stableStringify, stableParamsToClear]
    )

    const webParam = nextRouter?.query?.[name as string]

    const state = useMemo<ParsedType>(() => {
      let state: ParsedType
      if (webParam === undefined && !hasSetState.current) {
        state = initialValue.current as any
      } else {
        state = stableParse(webParam) as ParsedType
      }
      return state
    }, [stableParse, webParam])

    if (Platform.OS !== 'web') {
      if (!nativeRoute) {
        console.error(
          `[solito] useParam('${
            name as string
          }') called when there is no React Navigation route available. In a future version, this will throw an error. Please fix this by only calling useParam() inside of a React Navigation route. For now, Solito will fallback to using React state.`
        )
      }
      return [nativeState, setNativeState]
    }

    return [state, setState]
  }

  type UpdateOptions = {
    web?: {
      replace?: boolean
    }
  }

  function useUpdateParams(): (
    props: Partial<Props>,
    options?: UpdateOptions
  ) => void {
    const nativeNavigation = useNavigation()

    const setNativeStateFromParams = useCallback((value: Partial<Props>) => {
      nativeNavigation?.setParams(value)
    }, [])

    const setWebState = useCallback(
      (value: Partial<Props>, options?: UpdateOptions) => {
        const { pathname, query } = Router
        const newQuery = { ...query, ...value }
        for (const key in value) {
          if (value[key] == null || value[key] === '') {
            delete newQuery[key]
          }
        }

        const action = options?.web?.replace ? Router.replace : Router.push

        action(
          {
            pathname,
            query: newQuery,
          },
          undefined,
          {
            shallow: true,
          }
        )
      },
      []
    )

    return Platform.select({
      web: setWebState,
      default: setNativeStateFromParams,
    })
  }

  const empty = {}

  function useParams(): {
    params: Props
    setParams: (value: Partial<Props>, options?: SetStateOptions) => void
  } {
    if (Platform.OS !== 'web') {
      const nativeRoute = useRoute()
      const nativeNavigation = useNavigation()

      return {
        params: (nativeRoute?.params ?? empty) as Props,
        setParams: useCallback(
          (params) => nativeNavigation?.setParams(params),
          [nativeNavigation]
        ),
      }
    }
    const nextRouter = useRouter()

    return {
      params: nextRouter?.query as Props,
      setParams: useCallback((params, options) => {
        const { pathname, query } = Router
        const newQuery = { ...query, ...params }
        for (const key in params) {
          if (params[key] == null) {
            delete newQuery[key]
          }
        }

        const action = Router[options?.webBehavior ?? 'push']

        action(
          {
            pathname,
            query: newQuery,
          },
          undefined,
          {
            shallow: true,
          }
        )
      }, []),
    }
  }

  return {
    useParam,
    useUpdateParams,
    useParams,
  }
}

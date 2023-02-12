import Router from 'next/router'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { Params, Returns, UpdateOptions } from './types'
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
    const {
      parse = (value?: string | string[]) => value,
      initial,
      stringify = (value: ParsedType) => `${value}`,
      paramsToClearOnSetState,
    } = maybeConfig || {}
    const nextRouter = useRouter()

    const stableStringify = useStableCallback(stringify)
    const stableParse = useStableCallback(parse)
    const stableParamsToClear = useStable(paramsToClearOnSetState)

    const initialValue = useRef(initial)
    const hasSetState = useRef(false)

    const setState = useCallback(
      (value: ParsedType) => {
        hasSetState.current = true
        const { pathname, query } = Router
        const newQuery = { ...query }
        if (value != null && (value as any) !== '') {
          newQuery[name as string] = stableStringify(value)
        } else {
          delete newQuery[name as string]
        }

        if (stableParamsToClear.current) {
          for (const paramKey of stableParamsToClear.current) {
            delete newQuery[paramKey as string]
          }
        }

        const willChangeExistingParam =
          query[name as string] && newQuery[name as string]

        const action = willChangeExistingParam ? Router.replace : Router.push

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

    return [state, setState]
  }

  function useUpdateParams(): (
    props: Partial<Props>,
    options?: UpdateOptions
  ) => void {
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

    return setWebState
  }

  return {
    useParam,
    useUpdateParams,
  }
}

export type Config<
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

export type Params<
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
> = NonNullable<ParsedType> extends string
  ?
      | [name: Name, config: Config<Props, false, ParsedType, InitialValue>]
      | [name: Name]
  : [name: Name, config: Config<Props, true, ParsedType, InitialValue>]

export type Returns<
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
  setState: (value: ParsedType) => void
]

export type UpdateOptions = {
  web?: {
    replace?: boolean
  }
}

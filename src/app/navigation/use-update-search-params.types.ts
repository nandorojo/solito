export type UseUpdateSearchParamsReturns<
  Params extends Record<string, string>
> = (
  params: Partial<Params>,
  options?: {
    webBehavior?: 'replace' | 'push'
  }
) => void

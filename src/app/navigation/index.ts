export * from './use-router'
export * from './use-params'
export * from './use-search-params'
export * from './use-pathname'
export { default as useUpdateSearchParams } from './use-update-search-params'
import useUpdateSearchParams from './use-update-search-params'

type Params = {
  id: string
}

export function App() {
  const updateParams = useUpdateSearchParams<Params>()

  const onPress = () => {
    updateParams({ id: '123' })

    // by default, router.replace is called on Web if you're updating an existing param
    // to override this, see the  webBehavior property
    updateParams({ id: '123' }, { webBehavior: 'push' })
  }
}

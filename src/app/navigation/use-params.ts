import { Platform } from 'react-native'
import useNextParams from './use-next-params'
import { useRoute } from '../../params/use-route'

type OrArray<Type> = Type | Type[]

export function useParams<
  Type extends Record<string, OrArray<string | number | boolean>>,
  TypesSettings extends 'enforce-safety' | 'ignore-safety' = 'enforce-safety',
  CatchAllSegments extends Partial<Record<keyof Type, true>> = {}
>(
  _settings: {
    types?: TypesSettings
    catchAllSegments?: CatchAllSegments
  } = {}
) {
  type Returns = {
    // people need to manually type check that it's not an array or a string, since the URL could provide this
    [Key in keyof Type]: TypesSettings extends 'ignore-safety'
      ? Type[Key]
      : Key extends keyof CatchAllSegments
      ? Array<string | Type[Key]>
      : Type[Key] | string
  }
  if (Platform.OS === 'web') {
    return useNextParams() as Returns
  }

  const route = useRoute()

  if (!route) {
    console.error(
      `[useParams] route is undefined. Is your ${Platform.OS} app properly configured for React Navigation?`
    )
  }

  return route?.params as Returns
}

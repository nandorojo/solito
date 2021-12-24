import { LinkingOptions } from '@react-navigation/native'
import { useMemo, useRef, useState } from 'react'
import { Platform } from 'react-native'

import { useStableCallback } from '../helpers/use-stable-callback'

type Options = {
  onReady?: () => void
}

function useLinkingConfig<
  ParamList extends object = ReactNavigation.RootParamList
>(linking: LinkingOptions<ParamList>, options?: Options) {
  const trackedLinking = useRef(linking)
  const [ready, setReady] = useState(Platform.OS !== 'web')

  const onReady = useStableCallback(options?.onReady)

  return {
    linking: trackedLinking.current,
    onReady: useMemo(
      () =>
        Platform.select({
          web() {
            trackedLinking.current.enabled = false
            setReady(true)
            onReady?.()
          },
          default: onReady,
        }),
      [onReady]
    ),
    ready,
  }
}

export { useLinkingConfig }

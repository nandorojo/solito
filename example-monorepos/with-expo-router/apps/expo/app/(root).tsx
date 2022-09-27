import { Provider } from 'app/provider'
import { NativeStack } from 'expo-router'

export default function Root() {
  return (
    <Provider>
      <NativeStack />
    </Provider>
  )
}

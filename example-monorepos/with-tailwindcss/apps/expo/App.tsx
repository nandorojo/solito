import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'

import 'app/rnw-overrides'
import 'app/tailwindcss-react-native.d'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}

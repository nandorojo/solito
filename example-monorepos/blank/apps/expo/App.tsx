import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}

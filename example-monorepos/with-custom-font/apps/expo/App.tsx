import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Font } from './Fonts'

export default function App() {
  return (
    <Provider>
      <Font>
        <NativeNavigation />
      </Font>
    </Provider>
  )
}

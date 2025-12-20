import { NativeNavigation } from 'app/navigation/native';
import { Provider } from 'app/provider';

import '../../global.css';

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}

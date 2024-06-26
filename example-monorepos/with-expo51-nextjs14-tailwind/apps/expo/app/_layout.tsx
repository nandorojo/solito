import { Provider } from 'app/provider'
import { Stack } from 'expo-router'

export default function Root() {
  return (
    <Provider>
      <Stack screenOptions={{
        headerShown: false
      }}
      initialRouteName='index'>
        <Stack.Screen name="index" />
      </Stack>
    </Provider>
  )
}

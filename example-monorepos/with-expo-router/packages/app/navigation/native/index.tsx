import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { HomeScreen } from 'app/features/home/screen'
import { UserDetailScreen } from 'app/features/user/detail-screen'
import { Text, View } from 'react-native'
import { Link as MotiLink } from 'solito/link'
import { MotiView } from 'moti'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
}>()

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <MotiLink href="/user/1">
          <Text>Go to user</Text>
        </MotiLink>
      </MotiView>
    </View>
  )
}

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}

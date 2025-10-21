import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from 'src/store/authStore'

const AppStackScreens = () => {
  const { logout } = useAuthStore();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Text>AppStackScreens</Text>
      <TouchableOpacity onPress={logout} style={{marginTop: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5}}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AppStackScreens
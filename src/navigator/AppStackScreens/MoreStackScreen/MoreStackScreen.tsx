import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from 'src/store/authStore'

const MoreStackScreen = () => {
  const { logout} = useAuthStore()
  const handleLogout = () => {
    // Handle logout logic here
    logout()
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default MoreStackScreen
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from 'screens/App/Chat/ChatScreen';
import { chatPath, chatWindowPath } from 'constants/pathLocations';
import ChatWindow from 'screens/App/Chat/ChatWindow/ChatWindow';
import ChatHeader from 'components/Header/ChatHeader/ChatHeader';

const ChatStack = createStackNavigator();

const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={chatPath}
        component={ChatScreen}
        options={{
          headerShown: true,
          header: () => <ChatHeader />
        }}
      />
      <ChatStack.Screen
        name={chatWindowPath}
        component={ChatWindow}
      />
    </ChatStack.Navigator>
  );
}

export default ChatStackScreen
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'typescript/types';
import { bottomTabsStackPath, postStackPath } from 'constants/pathLocations';
import BottomMenu from 'navigator/BottomMenu/BottomMenu';
import PostStackScreen from './PostStackScreen/PostStackScreen';

const AppStack = createStackNavigator<RootStackParamList>();

const AppStackScreens = () => {
  return (
    <>
      <AppStack.Navigator initialRouteName={bottomTabsStackPath} screenOptions={{ headerShown: false }}>
        <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomMenu} />
        <AppStack.Screen key={postStackPath} name={postStackPath} component={PostStackScreen} />
      </AppStack.Navigator>
    </>
  )
}

export default AppStackScreens
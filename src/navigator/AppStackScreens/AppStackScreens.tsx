import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from 'typescript/types';
import { bottomTabsStackPath } from 'constants/pathLocations';
import BottomMenu from 'navigator/BottomMenu/BottomMenu';

const AppStack = createStackNavigator<RootStackParamList>();

const AppStackScreens = () => {
  return (
    <>
      <AppStack.Navigator initialRouteName={bottomTabsStackPath} screenOptions={{ headerShown: false }}>
        <AppStack.Screen key={bottomTabsStackPath} name={bottomTabsStackPath} component={BottomMenu} />
      </AppStack.Navigator>
    </>
  )
}

export default AppStackScreens
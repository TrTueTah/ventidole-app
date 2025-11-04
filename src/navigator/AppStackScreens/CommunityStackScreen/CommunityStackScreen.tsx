import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { communityStackPath } from 'constants/pathLocations';
import CommunityScreen from 'screens/App/Community/CommunityScreen';

const CommunityStack = createStackNavigator();

const CommunityStackScreen = () => {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name={communityStackPath}
        component={CommunityScreen}
        options={{
          headerShown: false,
          // header: () => <HeaderTransparent />
        }}
      />
    </CommunityStack.Navigator>
  );
}

export default CommunityStackScreen
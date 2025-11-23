import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'typescript/types';
import { communityStackPath } from 'constants/pathLocations';
import CommunityScreen from 'screens/App/Community/CommunityScreen';

const CommunityStack = createStackNavigator();

type CommunityStackRouteProp = RouteProp<RootStackParamList, '/community-stack'>;

const CommunityStackScreen = () => {
  const route = useRoute<CommunityStackRouteProp>();
  const { communityId } = route.params;

  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name={communityStackPath}
        component={CommunityScreen}
        initialParams={{ communityId }}
        options={{
          headerShown: false,
          // header: () => <HeaderTransparent />
        }}
      />
    </CommunityStack.Navigator>
  );
}

export default CommunityStackScreen
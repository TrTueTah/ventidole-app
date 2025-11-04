import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/App/Home/HomeScreen';
import HomeHeader from 'components/Header/HomeHeader/HomeHeader';
import { communityStackPath, homePath } from 'constants/pathLocations';
import CommunityStackScreen from '../CommunityStackScreen/CommunityStackScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen: FC = () => {
  return (
    <HomeStack.Navigator initialRouteName={homePath}>
      <HomeStack.Screen
        name={homePath}
        key={homePath}
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => <HomeHeader />,
        }}
      />
      <HomeStack.Screen
        key={communityStackPath}
        name={communityStackPath}
        component={CommunityStackScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;

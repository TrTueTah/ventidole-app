import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/App/Home/HomeScreen';
import HomeHeader from 'components/Header/HomeHeader/HomeHeader';
import { homePath } from 'constants/pathLocations';

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
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;

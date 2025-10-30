import React, { FC, JSX, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//import components
import useStyles from 'navigator/BottomMenu/styles';
import { whiteColor } from 'constants/colors.ts';

import { TabBarName, TabIcon } from 'navigator/TabBar/TabBar';

import { archivePath, chatPath, homePath, morePath, shopPath } from 'constants/pathLocations';
import HomeStackScreen from 'navigator/AppStackScreens/HomeStackScreen/HomeStackScreen';
import ShopStackScreen from 'navigator/AppStackScreens/ShopStackScreen/ShopStackScreen';
import ChatStackScreen from 'navigator/AppStackScreens/ChatStackScreen/ChatStackScreen';
import MoreStackScreen from 'navigator/AppStackScreens/MoreStackScreen/MoreStackScreen';

const BottomMenu: FC = (): JSX.Element => {

  const Tab = createBottomTabNavigator();
  const styles = useStyles();
  const initialRouteName = homePath

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        headerTransparent: false,
        tabBarActiveTintColor: whiteColor,
        tabBarStyle: styles.tabNavigator,
        tabBarIcon: ({ focused }: { focused: boolean }) => TabIcon(focused, route.name),
        tabBarLabel: ({ focused }: { focused: boolean }) => TabBarName(focused, route.name),
        tabBarButton: (props: BottomTabBarButtonProps) => {
          const { children, onPress, onLongPress, accessibilityRole, accessibilityState, accessibilityLabel, style } = props;
          return (
            <TouchableOpacity
              onPress={onPress || undefined}
              onLongPress={onLongPress || undefined}
              accessibilityRole={accessibilityRole}
              accessibilityState={accessibilityState}
              accessibilityLabel={accessibilityLabel}
              activeOpacity={1}
              style={[style, { backgroundColor: 'transparent' }]}
            >
              {children}
            </TouchableOpacity>
          );
        },
      })}
      initialRouteName={initialRouteName}>
      <Tab.Screen name={homePath} component={HomeStackScreen} />
      <Tab.Screen name={shopPath} component={ShopStackScreen} initialParams={{ initialTab: 'explore' }} />
      <Tab.Screen name={chatPath} component={ChatStackScreen} />
      <Tab.Screen name={morePath} component={MoreStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;

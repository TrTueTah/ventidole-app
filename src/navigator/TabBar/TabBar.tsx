import React, { ReactElement, useMemo } from 'react';
import { View } from 'react-native';
import { Label, IconWrapper } from './styles';
import { blackColor, secondaryColor } from 'constants/colors';
import { RootStackParamList } from 'typescript/types';
import Home from 'assets/images/tab-bar/home.svg';
import Shop from 'assets/images/tab-bar/shop.svg';
import Archive from 'assets/images/tab-bar/archive.svg';
import Chat from 'assets/images/tab-bar/chat.svg';
import More from 'assets/images/tab-bar/more.svg';
import {
  archivePath,
  chatPath,
  homePath,
  morePath,
  shopPath,
} from 'constants/pathLocations';

export const TabBarName = (focused: boolean, route: string) => {
  const getLabel = (): string =>
    ({
      [homePath]: 'Home',
      [shopPath]: 'Shop',
      [archivePath]: 'Archive',
      [chatPath]: 'Chats',
      [morePath]: 'More',
    }[route as keyof RootStackParamList]);

  return (
    <Label style={{ color: focused ? secondaryColor : blackColor }}>
      {getLabel()}
    </Label>
  );
};

export const TabIcon = (focused: boolean, route: string): ReactElement => {
  const getIcon = (): ReactElement =>
    ({
      [homePath]: focused ? (
        <Home color={secondaryColor} />
      ) : (
        <Home color={blackColor} />
      ),
      [shopPath]: focused ? (
        <Shop color={secondaryColor} />
      ) : (
        <Shop color={blackColor} />
      ),
      [archivePath]: focused ? (
        <Archive color={secondaryColor} />
      ) : (
        <Archive color={blackColor} />
      ),
      [chatPath]: focused ? (
        <Chat color={secondaryColor} />
      ) : (
        <Chat color={blackColor} />
      ),
      [morePath]: focused ? (
        <More color={secondaryColor} />
      ) : (
        <More color={blackColor} />
      ),
    }[route as keyof RootStackParamList]);

  return (
    <IconWrapper
      style={{ borderTopColor: focused ? secondaryColor : 'transparent' }}
    >
      {
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {getIcon()}
        </View>
      }
    </IconWrapper>
  );
};

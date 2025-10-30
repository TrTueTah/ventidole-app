import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { postStackPath } from 'constants/pathLocations';
import PostScreen from 'screens/App/Post/PostScreen';
import HeaderBackButton from 'components/Header/HeaderBackButton/HeaderBackButton';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import { Montserrat300, Montserrat500 } from 'constants/fonts';
import { black50Color } from 'constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';

const PostStack = createStackNavigator();

const PostStackScreen = ({ route }: { route: any }) => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name={postStackPath}
        component={PostScreen}
        options={{
          headerShown: true,
          header: () => <HeaderBackButton children={<PostTitle />} />,
        }}
      />
    </PostStack.Navigator>
  );
};

const PostTitle = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          fontSize: RFValue(16),
          fontFamily: Montserrat500,
        }}
      >
        Posts
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Text
          style={{
            fontSize: RFValue(12),
            fontFamily: Montserrat300,
            color: black50Color,
          }}
        >
          Go to community
        </Text>
        <ArrowRight
          width={RFValue(10)}
          height={RFValue(10)}
          color={black50Color}
        />
      </View>
    </View>
  );
};
export default PostStackScreen;

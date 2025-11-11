import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { postStackPath, replyPath } from 'constants/pathLocations';
import PostScreen from 'screens/App/Post/PostScreen';
import HeaderBackButton from 'components/Header/HeaderBackButton/HeaderBackButton';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import { Montserrat300, Montserrat500 } from 'constants/fonts';
import { black50Color } from 'constants/colors';
import { RFValue } from 'react-native-responsive-fontsize';
import ReplyScreen from 'screens/App/Reply/ReplyScreen';
import { useAppNavigation } from 'hooks/useAppNavigation';

const PostStack = createStackNavigator();

const PostStackScreen = ({ route }: { route: any }) => {
  const communityId = route?.params?.communityId;
  const postId = route?.params?.postId;
  console.log('PostStackScreen communityId:', communityId);
  console.log('PostStackScreen postId:', postId);
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name={postStackPath}
        component={PostScreen}
        options={{
          headerShown: true,
          header: () => <HeaderBackButton children={<PostTitle title={'Post'} communityId={communityId} />} />,
        }}
        initialParams={{ communityId, postId }}
      />
      <PostStack.Screen
        name={replyPath}
        component={ReplyScreen}
        options={{
          headerShown: true,
          header: () => <HeaderBackButton children={<PostTitle title={'Replies'} communityId={communityId} />} />,
        }}
      />
    </PostStack.Navigator>
  );
};

const PostTitle = ({ title, communityId }: { title: string; communityId?: string }) => {
  const navigation = useAppNavigation();
  
  const handleGoToCommunity = () => {
    if (communityId) {
      // Navigate to specific community with nested navigation
      navigation.navigate('/bottom-tabs-stack', {
        screen: '/home',
        params: {
          screen: '/community-stack',
          params: {
            communityId: communityId,
          },
        },
      });
    } else {
      // Just go to bottom tabs (home)
      navigation.navigate('/bottom-tabs-stack');
    }
  };
  
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          fontSize: RFValue(16),
          fontFamily: Montserrat500,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
        onPress={handleGoToCommunity}
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
      </TouchableOpacity>
    </View>
  );
};
export default PostStackScreen;

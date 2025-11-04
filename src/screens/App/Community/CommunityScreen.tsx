import React from 'react';
import { Animated, View, Text } from 'react-native';
import HeaderTransparent from 'components/Header/HeaderTransparent/HeaderTransparent';
import * as S from './CommunityScreen.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import { blackColor } from 'constants/colors';
import { BlurView } from '@react-native-community/blur';
const HEADER_HEIGHT = 400;

const CommunityScreen = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // fake data
  const posts = React.useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Bài viết ${i + 1}`,
      })),
    [],
  );

  // phần header cover + intro, render riêng ở đầu list
  const renderHeader = () => (
    <S.HeaderContainer
      style={{
        height: HEADER_HEIGHT,
        overflow: 'visible', // ✅ cho phép ảnh tràn ra ngoài
        backgroundColor: '#000',
      }}
    >
      <S.HeaderImage
        source={{
          uri: 'https://res.cloudinary.com/dsc9afexw/image/upload/v1762054385/kt1-6905e9f7e7ad5_z2wfqq.jpg',
        }}
        style={{
          top: scrollY.interpolate({
            inputRange: [-200, 0],
            outputRange: [-200, 0], // ✅ kéo lên khi pull down
            extrapolate: 'clamp',
          }),
          height: scrollY.interpolate({
            inputRange: [-200, 0],
            outputRange: [HEADER_HEIGHT + 200, HEADER_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}
        resizeMode="cover"
      />
      <S.HeaderContent>
        <S.BlurBackground/>
        <S.HeaderSubtitle>117K members · Joined</S.HeaderSubtitle>
        <S.HeaderTitle>LEE CHAE MIN</S.HeaderTitle>
        <S.JoinButton>
          <PlusIcon width={24} height={24} color={blackColor} />
          <S.JoinText style={{ color: blackColor, fontSize: 14 }}>
            Join
          </S.JoinText>
        </S.JoinButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  );

  return (
    <S.Container>
      <HeaderTransparent scrollY={scrollY} title="LEE CHAE MIN" />
      <Animated.FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </View>
        )}
        ListHeaderComponent={renderHeader}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        // ✅ gắn hiệu ứng header vào scroll của FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        // ⚡ performance tuning
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
      />
    </S.Container>
  );
};

export default CommunityScreen;

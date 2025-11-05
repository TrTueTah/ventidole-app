import React from 'react';
import * as S from './HomeScreen.style';
import ArtistCommunityList from './components/ArtistCommunityList/ArtistCommunityList';
import HomeBanner from './components/HomeBanner/HomeBanner';
import PostCard from 'components/Card/PostCard/PostCard';
import { useAppNavigation } from 'hooks/useAppNavigation';
const POST_SAMPLE_DATA = [
  {
    author: {
      id: 'a1',
      name: 'John Doe',
      avatarUrl:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
      communityId: 'c1',
    },
    id: '1',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1758008644/iK-Cji6J73Q-HD_nmbkfm.jpg',
    totalComment: 12120,
    totalLike: 3345,
    createdAt: 1761749452,
  },
  {
    author: {
      id: 'a2',
      name: 'Jane Smith',
      communityId: 'c1',
      avatarUrl:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
    },
    id: '2',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1758008644/iK-Cji6J73Q-HD_nmbkfm.jpg',
    totalComment: 12120,
    totalLike: 3345,
    createdAt: 1761749452,
  },
  {
    author: {
      id: 'a3',
      name: 'Alice Johnson',
      communityId: 'c1',
      avatarUrl:
        'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
    },
    id: '3',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1758008644/iK-Cji6J73Q-HD_nmbkfm.jpg',
    totalComment: 12120,
    totalLike: 3345,
    createdAt: 1761749452,
  },
];

const HomeScreen = () => {
  const navigation = useAppNavigation();
  const handlePostPress = (postId: string, communityId: string) => {
    navigation.navigate('/post-stack', { postId, communityId });
  }
  return (
    <S.Container>
      <S.PostList
        data={POST_SAMPLE_DATA}
        ListHeaderComponent={
          <S.TopContainer>
            <ArtistCommunityList />
            <HomeBanner />
          </S.TopContainer>
        }
        renderItem={({ item }: { item: any }) => (
          <S.TouchableZone onPress={() => handlePostPress(item.id, item.author.communityId)}>
            <PostCard post={item} containerStyle={{ borderRadius: 20 }}/>
          </S.TouchableZone>
        )}
      />
    </S.Container>
  );
};

export default HomeScreen;

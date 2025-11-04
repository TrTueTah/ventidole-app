import { primaryColor } from 'constants/colors';
import * as S from './ArtistCommunityList.style';
import PlusIcon from 'assets/images/icons/plus.svg';
import { useAppNavigation } from 'hooks/useAppNavigation';

const SAMPLE_DATA = [
  {
    id: '1',
    name: 'Artist 1 sdafsafafa',
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  {
    id: '2',
    name: 'Artist 2',
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  {
    id: '3',
    name: 'Artist 3',
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  {
    id: '4',
    name: 'Artist 4',
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
  {
    id: '5',
    name: 'Artist 5',
    imageUrl:
      'https://res.cloudinary.com/dsc9afexw/image/upload/v1756372055/5c53d14e4ebbf5c723559e7b3f27c628baac4651_izhcbp.png',
  },
];

const ArtistCommunityList = () => {
  const navigation = useAppNavigation();
  return (
    <S.ArtistContainer>
      <S.ArtistList
        contentContainerStyle={{ gap: 12, justifyContent: 'flex-start' }}
        ListHeaderComponent={
          <S.AddButton>
            <PlusIcon width={40} height={40} color={primaryColor} />
          </S.AddButton>
        }
        data={SAMPLE_DATA}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: any }) => (
          <S.ArtistItem onPress={() => navigation.navigate('/community-stack', { communityId: item.id })}>
            <S.ArtistImage source={{ uri: item.imageUrl }} />
            <S.ArtistName>{item.name}</S.ArtistName>
          </S.ArtistItem>
        )}
      />
    </S.ArtistContainer>
  );
};

export default ArtistCommunityList;

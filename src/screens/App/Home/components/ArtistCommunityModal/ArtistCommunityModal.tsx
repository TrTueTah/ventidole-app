import React, { useState, useCallback } from 'react';
import { Modal, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './ArtistCommunityModal.style';
import { useCommunities } from '../ArtistCommunityList/hooks/useComunities';
import { useJoinCommunity } from './hooks/useJoinCommunity';
import { useLeaveCommunity } from './hooks/useLeaveCommunity';
import { blackColor, grayColor, primaryColor } from 'constants/colors';
import CloseIcon from 'assets/images/icons/close.svg';
import SearchIcon from 'assets/images/icons/search.svg';
import Button from 'components/Button/Button';

interface ArtistCommunityModalProps {
  visible: boolean;
  onClose: () => void;
}

type FilterType = 'All' | 'Group' | 'Solo' | 'Latin' | 'New' | 'Weverse' | 'Joined';

const FILTERS: FilterType[] = ['All', 'Joined'];

const ArtistCommunityModal: React.FC<ArtistCommunityModalProps> = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [loadingCommunityId, setLoadingCommunityId] = useState<string | null>(null);

  // Fetch communities based on filter and search
  const {
    communities,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    refresh,
  } = useCommunities({
    limit: 20,
    filter: activeFilter === 'Joined' ? 'joined' : 'all',
    search: searchQuery,
  });

  const { mutate: joinCommunity } = useJoinCommunity();
  const { mutate: leaveCommunity } = useLeaveCommunity();

  const handleJoinToggle = useCallback((communityId: string, isJoined: boolean) => {
    if (isJoined) {
      Alert.alert(
        'Leave Community',
        'Are you sure you want to leave this community?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Leave',
            style: 'destructive',
            onPress: () => {
              setLoadingCommunityId(communityId);
              leaveCommunity(
                {
                  body: { communityId }
                },
                {
                  onSuccess: () => {
                    setLoadingCommunityId(null);
                    refresh();
                  },
                  onError: (error: any) => {
                    setLoadingCommunityId(null);
                    Alert.alert('Error', error.message || 'Failed to leave community');
                  },
                }
              );
            },
          },
        ]
      );
    } else {
      setLoadingCommunityId(communityId);
      joinCommunity(
        {
          body: { communityId }
        },
        {
          onSuccess: () => {
            setLoadingCommunityId(null);
            refresh();
          },
          onError: (error: any) => {
            setLoadingCommunityId(null);
            Alert.alert('Error', error.message || 'Failed to join community');
          },
        }
      );
    }
  }, [joinCommunity, leaveCommunity, refresh]);

  const renderCommunityItem = ({ item }: { item: any }) => {
    const isNew = item.createdAt && new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const isLoadingThisItem = loadingCommunityId === item.id;

    return (
      <S.CommunityItem>
        <S.CommunityAvatar
          source={{ uri: item.avatarUrl || 'https://via.placeholder.com/56' }}
        />
        <S.CommunityInfo>
          {isNew && (
            <S.CommunityBadge>
              <S.CommunityBadgeText>NEW</S.CommunityBadgeText>
            </S.CommunityBadge>
          )}
          <S.CommunityName numberOfLines={1}>{item.name}</S.CommunityName>
          <S.CommunityMembers>
            {item.followerCount || 0} members{item.isJoin ? ' · Joined' : ''}
          </S.CommunityMembers>
        </S.CommunityInfo>
        <Button
          title={item.isJoin ? 'Joined' : 'Join'}
          onPress={() => handleJoinToggle(item.id, item.isJoin)}
          loading={isLoadingThisItem}
          variant={item.isJoin ? 'outline' : 'default'}
          buttonStyle={{
            borderRadius: 20,
            height: 40,
            minWidth: 80,
          }}
          buttonTitleStyle={{
            fontSize: 14,
          }}
        />
      </S.CommunityItem>
    );
  };

  const renderEmpty = () => {
    if (isLoading) {
      return null;
    }

    return (
      <S.EmptyContainer>
        <S.EmptyText>
          {searchQuery ? 'No communities found matching your search' : 'No communities available'}
        </S.EmptyText>
      </S.EmptyContainer>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <S.LoadingContainer>
        <ActivityIndicator color={primaryColor} />
      </S.LoadingContainer>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <S.Container>
        <S.Header>
          <S.BackButton onPress={onClose}>
            <CloseIcon width={24} height={24} color={blackColor} />
          </S.BackButton>
          <S.SearchContainer>
            <S.SearchIcon>
              <SearchIcon width={24} height={24} color={grayColor} />
            </S.SearchIcon>
            <S.SearchInput
              placeholder="Enter artist name"
              placeholderTextColor="rgba(30, 30, 30, 0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </S.SearchContainer>
        </S.Header>

        <S.FilterContainer>
          <S.FilterContent>
            {FILTERS.map((filter) => (
              <S.FilterButton
                key={filter}
                isActive={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              >
                <S.FilterText isActive={activeFilter === filter}>
                  {filter}
                </S.FilterText>
              </S.FilterButton>
            ))}
          </S.FilterContent>
        </S.FilterContainer>

        {isLoading ? (
          <S.LoadingContainer>
            <ActivityIndicator color={primaryColor} size="large" />
          </S.LoadingContainer>
        ) : (
          <S.ContentList
            data={communities}
            keyExtractor={(item: any) => item.id}
            renderItem={renderCommunityItem}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            onEndReached={hasMore ? loadMore : undefined}
            onEndReachedThreshold={0.5}
            refreshing={false}
            onRefresh={refresh}
          />
        )}
      </S.Container>
    </Modal>
  );
};

export default ArtistCommunityModal;

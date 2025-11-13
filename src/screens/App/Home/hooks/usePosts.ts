import { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type PostDto = components['schemas']['PostDto'];

interface UsePostsParams {
  limit?: number;
  userId?: string;
  hashtag?: string;
  visibility?: 'public' | 'followers' | 'private';
  sortBy?: 'createdAt' | 'likesCount' | 'commentsCount';
  sortOrder?: 'asc' | 'desc';
}

export const usePosts = (params: UsePostsParams = {}) => {
  const backendApi = useContext(BackendApiContext);

  const {
    limit = 20,
    userId,
    hashtag,
    visibility,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = params;

  // Build query params
  const baseQueryParams = useMemo(() => {
    const params: any = {
      limit,
      sortBy,
      sortOrder,
    };
    
    if (userId !== undefined) params.userId = userId;
    if (hashtag !== undefined) params.hashtag = hashtag;
    if (visibility !== undefined) params.visibility = visibility;
    
    return params;
  }, [limit, userId, hashtag, visibility, sortBy, sortOrder]);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching, error, refetch } = backendApi.useInfiniteQuery(
    'get',
    '/v1/post',
    {
      params: {
        query: baseQueryParams,
      },
    },
    {
      initialPageParam: 1,
      pageParamName: 'page',
      getNextPageParam: (lastPage: any) => {
        console.log('usePosts - lastPage:', lastPage);
        const pagingInfo = lastPage?.paging;
        if (pagingInfo && typeof pagingInfo === 'object' && 'totalPages' in pagingInfo && 'page' in pagingInfo) {
          const nextPage = pagingInfo.page + 1;
          return nextPage <= pagingInfo.totalPages ? nextPage : undefined;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    console.log('usePosts - isLoading:', isLoading);
  }, [data]);

  console.log('usePosts - data:', data);
  console.log('usePosts - data.pages:', data?.pages);

  // Flatten all pages into posts array
  const posts = useMemo(() => {
    if (!data?.pages) {
      console.log('usePosts - No pages data');
      return [];
    }
    
    const allPosts = data.pages.flatMap((page: any) => {
      console.log('usePosts - Page data:', page);
      return page.data || [];
    });
    
    console.log('usePosts - Flattened posts:', allPosts);
    return allPosts;
  }, [data]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      console.log('loadMore - Fetching next page');
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // Refresh posts
  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    posts,
    isLoading,
    isLoadingMore: isFetching && !isLoading,
    isRefreshing: isRefetching,
    error,
    hasMore: hasNextPage,
    loadMore,
    refresh,
  };
};
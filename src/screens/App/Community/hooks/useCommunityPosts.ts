import { useCallback, useContext, useMemo } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type PostDto = components['schemas']['PostDto'];

interface UseCommunityPostsParams {
  communityId?: string;
  limit?: number;
  sortBy?: 'createdAt' | 'likesCount' | 'commentsCount';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

export const useCommunityPosts = (params: UseCommunityPostsParams) => {
  const backendApi = useContext(BackendApiContext);

  const {
    communityId,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    enabled = true,
  } = params;

  // Build query params
  const baseQueryParams = useMemo(() => {
    const params: any = {
      limit,
      sortBy,
      sortOrder,
    };

    return params;
  }, [limit, sortBy, sortOrder]);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching, error, refetch } = backendApi.useInfiniteQuery(
    'get',
    '/v1/post/community/{communityId}',
    {
      params: {
        path: {
          communityId: communityId || '',
        },
        query: baseQueryParams,
      },
    },
    {
      enabled: enabled && !!communityId,
      initialPageParam: 1,
      pageParamName: 'page',
      getNextPageParam: (lastPage: any) => {
        console.log('useCommunityPosts - lastPage:', lastPage);
        const pagingInfo = lastPage?.paging;
        if (pagingInfo && typeof pagingInfo === 'object' && 'totalPages' in pagingInfo && 'page' in pagingInfo) {
          const nextPage = pagingInfo.page + 1;
          return nextPage <= pagingInfo.totalPages ? nextPage : undefined;
        }
        return undefined;
      },
    }
  );

  console.log('useCommunityPosts - data:', data);
  console.log('useCommunityPosts - data.pages:', data?.pages);

  // Flatten all pages into posts array
  const posts = useMemo(() => {
    if (!data?.pages) {
      console.log('useCommunityPosts - No pages data');
      return [];
    }

    const allPosts = data.pages.flatMap((page: any) => {
      console.log('useCommunityPosts - Page data:', page);
      return page.data || [];
    });

    console.log('useCommunityPosts - Flattened posts:', allPosts);
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

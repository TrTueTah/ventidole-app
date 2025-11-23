import { BackendApiContext } from "contexts/BackendApiContex";
import { useCallback, useContext, useEffect, useMemo } from "react";

interface UseCommunitiesParams {
  limit?: number;
  filter?: 'all' | 'joined';
  search?: string;
}

export const useCommunities = (params: UseCommunitiesParams = {}) => {
  const backendApi = useContext(BackendApiContext);

  const {
    limit = 20,
    filter = 'all',
    search,
  } = params;

  // Build query params
  const baseQueryParams = useMemo(() => {
    const params: any = {
      limit,
      filter,
    };

    // Add search param if provided
    if (search && search.trim()) {
      params.search = search.trim();
    }

    return params;
  }, [limit, filter, search]);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isRefetching, error, refetch } = backendApi.useInfiniteQuery(
    'get',
    '/v1/community',
    {
      params: {
        query: baseQueryParams,
      },
    },
    {
      initialPageParam: 1,
      pageParamName: 'page',
      getNextPageParam: (lastPage: any) => {
        console.log('useCommunities - lastPage:', lastPage);
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
    console.log('useCommunities - isLoading:', isLoading);
  }, [data]);

  console.log('useCommunities - data:', data);
  console.log('useCommunities - data.pages:', data?.pages);
  // Flatten all pages into communities array
  const communities = useMemo(() => {
    if (!data?.pages) {
      console.log('useCommunities - No pages data');
      return [];
    }
    
    const allCommunities = data.pages.flatMap((page: any) => {
      console.log('useCommunities - Page data:', page);
      return page.data || [];
    });
    
    console.log('useCommunities - Flattened communities:', allCommunities);
    return allCommunities;
  }, [data]);

  // Load more communities
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      console.log('loadMore - Fetching next page');
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // Refresh communities
  const refresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    communities,
    isLoading,
    isLoadingMore: isFetching && !isLoading,
    isRefreshing: isRefetching,
    error,
    hasMore: hasNextPage,
    loadMore,
    refresh,
  };
};
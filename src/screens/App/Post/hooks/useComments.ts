import { useCallback, useContext, useMemo } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

interface UseCommentsParams {
  postId: string;
  limit?: number;
  sortBy?: 'createdAt' | 'likesCount';
  sortOrder?: 'asc' | 'desc';
  enabled?: boolean;
}

export const useComments = (params: UseCommentsParams) => {
  const backendApi = useContext(BackendApiContext);
  
  const {
    postId,
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

  // Use openapi-react-query's useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
    refetch,
  } = backendApi.useInfiniteQuery(
    'get',
    '/v1/comment/post/{postId}',
    {
      params: {
        path: { postId },
        query: baseQueryParams,
      },
    },
    {
      initialPageParam: 1,
      pageParamName: 'page',
      getNextPageParam: (lastPage: any) => {
        console.log('useComments - lastPage:', lastPage);
        const pagingInfo = lastPage?.paging;
        if (pagingInfo && typeof pagingInfo === 'object' && 'totalPages' in pagingInfo && 'page' in pagingInfo) {
          const nextPage = pagingInfo.page + 1;
          return nextPage <= pagingInfo.totalPages ? nextPage : undefined;
        }
        return undefined;
      },
      enabled: enabled && !!postId, // Only fetch if enabled and postId is provided
    }
  );

  // Flatten all pages into comments array
  const comments = useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    
    const allComments = data.pages.flatMap((page: any) => {
      return page.data || [];
    });
    return allComments;
  }, [data]);

  // Load more comments (for infinite scroll)
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // Refresh comments (pull to refresh)
  const refresh = useCallback(async () => {
    refetch();
  }, [refetch]);

  // Add new comment to the top of the list (optimistic update)
  const addNewComment = useCallback((newComment: components['schemas']['CommentDto']) => {
    // Force a refetch to get the most up-to-date comments
    // This ensures the new comment appears at the top with proper sorting
    refetch();
  }, [refetch]);

  return {
    comments,
    isLoading: isLoading,
    isLoadingMore: isFetching && !isLoading,
    error,
    hasMore: hasNextPage ?? false,
    loadMore,
    refresh,
    addNewComment,
    totalComments: data?.pages?.[0]?.paging?.total ?? 0,
  };
};
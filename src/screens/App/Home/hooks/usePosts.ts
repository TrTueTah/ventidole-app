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

interface CachedPage {
  page: number;
  data: PostDto[];
  paging: any;
}

export const usePosts = (params: UsePostsParams = {}) => {
  const backendApi = useContext(BackendApiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedPages, setCachedPages] = useState<Map<number, CachedPage>>(new Map());
  const [hasMore, setHasMore] = useState(true);

  const {
    limit = 20,
    userId,
    hashtag,
    visibility,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = params;

  // Query for current page with React Query caching
  const { data, isLoading, error } = backendApi.useQuery(
    'get',
    '/v1/post',
    {
      params: {
        query: {
          page: currentPage,
          limit,
          userId,
          hashtag,
          visibility,
          sortBy,
          sortOrder,
        },
      },
    },
  );

  // Cache pages and update pagination state
  useEffect(() => {
    if (data?.data) {
      const newPosts = data.data as PostDto[];
      const pagingInfo = (data as any).paging;
      
      // Cache this page
      setCachedPages((prev) => {
        const newCache = new Map(prev);
        newCache.set(currentPage, {
          page: currentPage,
          data: newPosts,
          paging: pagingInfo,
        });
        console.log('usePosts - Cached pages count:', newCache.size);
        return newCache;
      });
      
      // Update hasMore based on paging info
      if (pagingInfo && typeof pagingInfo === 'object' && 'totalPages' in pagingInfo && 'page' in pagingInfo) {
        const hasMorePages = pagingInfo.page < pagingInfo.totalPages;
        console.log('usePosts - hasMore:', hasMorePages, `(${pagingInfo.page} < ${pagingInfo.totalPages})`);
        setHasMore(hasMorePages);
      } else {
        const hasMoreData = newPosts.length >= limit;
        console.log('usePosts - hasMore (fallback):', hasMoreData);
        setHasMore(hasMoreData);
      }
    }
  }, [data, currentPage, limit]);

  // Flatten all cached pages into posts array
  const posts = useMemo(() => {
    const sortedPages = Array.from(cachedPages.values()).sort((a, b) => a.page - b.page);
    const allPosts = sortedPages.flatMap((page) => page.data);
    return allPosts;
  }, [cachedPages]);

  // Load more posts (for infinite scroll)
  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1;
      console.log('loadMore - Loading page:', nextPage);
      setCurrentPage(nextPage);
    }
  }, [hasMore, isLoading, currentPage]);

  // Refresh posts (pull to refresh)
  const refresh = useCallback(() => {
    setCachedPages(new Map());
    setHasMore(true);
    setCurrentPage(1); // tự động trigger fetch page=1
  }, []);

  return {
    posts,
    isLoading: isLoading && currentPage === 1,
    isLoadingMore: isLoading && currentPage > 1,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};

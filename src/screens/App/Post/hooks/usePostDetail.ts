import { useContext } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type GetPostResponse = components['schemas']['GetPostResponse'];

interface UsePostDetailParams {
  postId: string;
  enabled?: boolean;
}

export const usePostDetail = ({ postId, enabled = true }: UsePostDetailParams) => {
  const backendApi = useContext(BackendApiContext);

  console.log('usePostDetail - postId:', postId);
  console.log('usePostDetail - enabled:', enabled);

  // Query for post detail
  const { data, isLoading, error, refetch } = backendApi.useQuery(
    'get',
    '/v1/post/{postId}',
    {
      params: {
        path: {
          postId,
        },
      },
    },
    {
      enabled: enabled && !!postId, // Only fetch if enabled and postId exists
    },
  );

  // Extract post data from response
  const post = data?.data as GetPostResponse | undefined;

  console.log('usePostDetail - post:', post);
  console.log('usePostDetail - isLoading:', isLoading);
  console.log('usePostDetail - error:', error);

  return {
    post,
    isLoading,
    error,
    refetch,
  };
};

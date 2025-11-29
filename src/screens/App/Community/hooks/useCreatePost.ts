import { useCallback, useContext } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type CreatePostRequest = components['schemas']['CreatePostRequest'];
type CreatePostResponse = components['schemas']['CreatePostResponse'];

interface UseCreatePostOptions {
  onSuccess?: (response: CreatePostResponse) => void;
  onError?: (error: Error) => void;
}

export const useCreatePost = (options: UseCreatePostOptions = {}) => {
  const backendApi = useContext(BackendApiContext);
  const { onSuccess, onError } = options;

  const {
    mutate: createPost,
    isPending: isCreating,
    error,
    data,
    reset,
  } = backendApi.useMutation('post', '/v1/post', {
    onSuccess: (response) => {
      console.log('Post created successfully:', response);
      if (response.data) {
        onSuccess?.(response.data);
      }
    },
    onError: (err) => {
      console.error('Failed to create post:', err);
      onError?.(err);
    },
  });

  const submitPost = useCallback(
    (postData: CreatePostRequest) => {
      createPost({
        body: postData,
      });
    },
    [createPost]
  );

  return {
    createPost: submitPost,
    isCreating,
    error,
    data: data?.data,
    reset,
  };
};

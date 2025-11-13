import { useCallback, useContext } from 'react';
import { BackendApiContext } from 'src/contexts/BackendApiContex';
import { components } from 'src/schemes/openapi';

type CreateCommentRequest = components['schemas']['CreateCommentRequest'];
type CreateCommentResponse = components['schemas']['CreateCommentResponse'];

interface UseCreateCommentOptions {
  onSuccess?: (response: CreateCommentResponse) => void;
  onError?: (error: Error) => void;
}

export const useCreateComment = (options: UseCreateCommentOptions = {}) => {
  const backendApi = useContext(BackendApiContext);
  const { onSuccess, onError } = options;

  const {
    mutate: createComment,
    isPending: isCreating,
    error,
    data,
    reset,
  } = backendApi.useMutation('post', '/v1/comment', {
    onSuccess: (response) => {
      console.log('Comment created successfully:', response);
      if (response.data) {
        onSuccess?.(response.data);
      }
    },
    onError: (err) => {
      console.error('Failed to create comment:', err);
      onError?.(err);
    },
  });

  const submitComment = useCallback(
    (commentData: CreateCommentRequest) => {
      createComment({
        body: commentData,
      });
    },
    [createComment]
  );

  return {
    createComment: submitComment,
    isCreating,
    error,
    data: data?.data,
    reset,
  };
};
import React, { useState } from 'react';
import { Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useCreatePost } from '../../hooks/useCreatePost';
import { usePostImagePicker } from '../../hooks/usePostImagePicker';
import * as S from './CreatePostModal.style';
import { blackColor, grayColor, primaryColor, whiteColor } from 'constants/colors';
import { Text } from 'react-native';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  communityId: string;
  onPostCreated?: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  visible,
  onClose,
  communityId,
  onPostCreated,
}) => {
  const [content, setContent] = useState('');
  const [hideFromArtists, setHideFromArtists] = useState(false);

  const {
    selectedImages,
    isUploading,
    openImagePicker,
    removeImage,
    uploadAllImages,
    clearImages,
  } = usePostImagePicker();

  const { createPost, isCreating, reset } = useCreatePost({
    onSuccess: () => {
      Alert.alert('Success', 'Post created successfully!');
      handleClose();
      onPostCreated?.();
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Failed to create post');
    },
  });

  const handleClose = () => {
    setContent('');
    clearImages();
    setHideFromArtists(false);
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      Alert.alert('Validation Error', 'Please enter post content or add an image');
      return;
    }

    // Upload all images first
    const uploadedUrls = await uploadAllImages();

    if (selectedImages.length > 0 && uploadedUrls.length === 0) {
      Alert.alert('Error', 'Failed to upload images. Please try again.');
      return;
    }

    createPost({
      content: content.trim(),
      mediaUrls: uploadedUrls,
      hashtags: [],
      location: '',
      visibility: 'public',
    });
  };

  const handleImagePicker = () => {
    openImagePicker();
  };

  const handleRemoveImage = (index: number) => {
    removeImage(index);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <S.Container>
          <S.Header>
            <S.CancelButton onPress={handleClose}>
              <S.CancelText>Cancel</S.CancelText>
            </S.CancelButton>
            <S.HeaderCenter>
              <S.HeaderTitle>Write a post</S.HeaderTitle>
              <S.HeaderSubtitle>TOMORROW X TOGETHER</S.HeaderSubtitle>
            </S.HeaderCenter>
            <S.PostButton onPress={handleSubmit} disabled={isCreating || isUploading}>
              <S.PostButtonText disabled={isCreating || isUploading}>
                {isUploading ? 'Uploading...' : 'Post'}
              </S.PostButtonText>
            </S.PostButton>
          </S.Header>

          <S.ContentContainer>
            <S.TextArea
              placeholder="What's on your mind?"
              placeholderTextColor={grayColor}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              autoFocus
            />

            {selectedImages.length > 0 && (
              <S.ImagePreviewContainer>
                {selectedImages.map((uri, index) => (
                  <S.ImagePreviewWrapper key={index}>
                    <S.ImagePreview source={{ uri }} />
                    <S.RemoveImageButton onPress={() => handleRemoveImage(index)}>
                      <S.RemoveImageIcon>×</S.RemoveImageIcon>
                    </S.RemoveImageButton>
                  </S.ImagePreviewWrapper>
                ))}
              </S.ImagePreviewContainer>
            )}
          </S.ContentContainer>

          <S.BottomSection>
            <S.BottomActionsRow>
              <S.ActionButton onPress={handleImagePicker}>
                <Text style={{ fontSize: 24 }}>🖼️</Text>
              </S.ActionButton>

              <S.ActionButton onPress={handleImagePicker}>
                <Text style={{ fontSize: 24 }}>✏️</Text>
              </S.ActionButton>

              <S.HideFromArtistsToggle>
                <S.ToggleSwitch
                  value={hideFromArtists}
                  onValueChange={setHideFromArtists}
                  trackColor={{ false: grayColor, true: primaryColor }}
                  thumbColor={whiteColor}
                />
                <S.ToggleLabel>Hide from Artists</S.ToggleLabel>
              </S.HideFromArtistsToggle>
            </S.BottomActionsRow>
          </S.BottomSection>
        </S.Container>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreatePostModal;

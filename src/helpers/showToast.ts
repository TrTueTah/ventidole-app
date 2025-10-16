import Toast from 'react-native-toast-message';
import { Platform } from 'react-native';
import { screenWidth } from 'constants/common';

export type UseToastType =
  | 'success'
  | 'pending'
  | 'warning'
  | 'cancel'
  | 'customToast'
  | 'warningGrey'
  | 'inviteMatch'
  | 'withAction'
  | 'basic'
  | 'withImage'

export const showToast = (
  type: UseToastType,
  message: string,
  title?: string,
  props?: any,
) => {
  if (!title) {
    if (type === 'success') {
      title = 'Success';
    }
    if (type === 'pending') {
      title = 'Your event in review.';
    }
    if (type === 'cancel') {
      title = '';
    }
    if (type === 'warning') {
      title = '';
    }
    if (type === 'warningGrey') {
      title = '';
    }
  }

  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      topOffset: Platform.OS == 'android' ? 48 : screenWidth > 377 ? 86 : 46,
      props: {
        ...props,
      },
    });
  }, 300);
};

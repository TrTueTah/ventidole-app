export type RootStackParamList = {
  '/sign-in': undefined;
  '/sign-up': undefined;
  '/reset-password': undefined;
  '/verify-email': {
    type: 'register' | 'resetPassword';
    header: string;
  };
  '/auth-complete': {
    type: 'register' | 'resetPassword';
    title: string;
    subtitle: string;
  };
  '/terms-and-use': undefined;
  '/choose-idol': undefined;
  '/bottom-tabs-stack': undefined;
  '/notifications-stack': undefined;
  '/common-stack': undefined;
  '/home': undefined;
  '/chat': undefined;
  '/chat/chat-window'?: {
    chatId: string;
  };
  '/shop': undefined;
  '/archive': undefined;
  '/more': undefined;
  '/post-stack': {
    screen?: string;
    postId: string;
  };
  '/post-stack/reply': {
    replyId: string;
  }
  '/community-stack': {
    screen?: string;
    communityId: string;
  };
};

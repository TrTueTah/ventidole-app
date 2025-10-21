
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
};

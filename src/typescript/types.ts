
export type RootStackParamList = {
  '/sign-in': undefined;
  '/sign-up': undefined;
  '/forgot-password': undefined;
  '/reset-password': undefined;
  '/reset-password-complete': undefined;
  '/verify-email': {
    type: 'register' | 'resetPassword';
    header: string;
  };
  '/register-complete': undefined;
  '/terms-and-use': undefined;
  '/bottom-tabs-stack': undefined;
  '/notifications-stack': undefined;
  '/common-stack': undefined;
};

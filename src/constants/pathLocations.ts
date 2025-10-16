import { RootStackParamList } from 'typescript/types';
// Stacks paths
const bottomTabsStackPath = '/bottom-tabs-stack';
const notificationsStackPath = '/notifications-stack';
const commonStackPath = '/common-stack';
// Screen paths
const signInPath: keyof RootStackParamList = '/sign-in';
const signUpPath: keyof RootStackParamList = '/sign-up';
const forgotPasswordPath: keyof RootStackParamList = '/forgot-password';
const resetPasswordPath: keyof RootStackParamList = '/reset-password';
const resetPasswordCompletePath: keyof RootStackParamList = '/reset-password-complete';
const verifyEmailPath: keyof RootStackParamList = '/verify-email';
const registerCompletePath: keyof RootStackParamList = '/register-complete';
const termAndUsePath: keyof RootStackParamList = '/terms-and-use';

export {
  // Stacks paths
  bottomTabsStackPath,
  notificationsStackPath,
  commonStackPath,
  // Screen paths
  signInPath,
  signUpPath,
  forgotPasswordPath,
  resetPasswordPath,
  resetPasswordCompletePath,
  verifyEmailPath,
  registerCompletePath,
  termAndUsePath,
};
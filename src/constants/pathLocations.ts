import { RootStackParamList } from 'typescript/types';
// Stacks paths
const bottomTabsStackPath = '/bottom-tabs-stack';
const notificationsStackPath = '/notifications-stack';
const commonStackPath = '/common-stack';
// Screen paths
const signInPath: keyof RootStackParamList = '/sign-in';
const signUpPath: keyof RootStackParamList = '/sign-up';
const resetPasswordPath: keyof RootStackParamList = '/reset-password';
const verifyEmailPath: keyof RootStackParamList = '/verify-email';
const authCompletePath: keyof RootStackParamList = '/auth-complete';
const termAndUsePath: keyof RootStackParamList = '/terms-and-use';
const chooseIdolPath: keyof RootStackParamList = '/choose-idol';
const chatPath: keyof RootStackParamList = '/chat';
const homePath: keyof RootStackParamList = '/home';
const shopPath: keyof RootStackParamList = '/shop';
const archivePath: keyof RootStackParamList = '/archive';
const morePath: keyof RootStackParamList = '/more';

export {
  // Stacks paths
  bottomTabsStackPath,
  notificationsStackPath,
  commonStackPath,
  // Screen paths
  chatPath,
  homePath,
  shopPath,
  archivePath,
  morePath,
  signInPath,
  signUpPath,
  resetPasswordPath,
  verifyEmailPath,
  authCompletePath,
  termAndUsePath,
  chooseIdolPath
};
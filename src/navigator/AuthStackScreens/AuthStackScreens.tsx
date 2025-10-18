import React, { FC, JSX } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { forgotPasswordPath, registerCompletePath, resetPasswordCompletePath, resetPasswordPath, signInPath, signUpPath, termAndUsePath, verifyEmailPath } from 'constants/pathLocations';
import SignInScreen from 'screens/Auth/SignIn/SignInScreen';
import SignUpScreen from 'screens/Auth/SignUp/SignUpScreen';
import ForgotPasswordScreen from 'screens/Auth/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPassword/ResetPasswordScreen';
import ResetPasswordCompleteScreen from 'screens/Auth/ResetPasswordComplete/ResetPasswordCompleteScreen';
import VerifyEmailScreen from 'screens/Auth/VerifyEmail/VerifyEmailScreen';
import RegisterCompleteScreen from 'screens/Auth/RegisterComplete/RegisterCompleteScreen';
import TermAndUseScreen from 'screens/Auth/TermAndUse/TermAndUseScreen';

const AuthStackScreens: FC = (): JSX.Element => {
  const AuthStack = createStackNavigator();
  return (
    <NavigationIndependentTree>
      <AuthStack.Navigator screenOptions={{ headerShown: false, freezeOnBlur: true }}>
        <AuthStack.Screen key={signInPath} name={signInPath} component={SignInScreen}/>
        <AuthStack.Screen key={signUpPath} name={signUpPath} component={SignUpScreen} />
        <AuthStack.Screen key={forgotPasswordPath} name={forgotPasswordPath} component={ForgotPasswordScreen} />
        <AuthStack.Screen key={resetPasswordPath} name={resetPasswordPath} component={ResetPasswordScreen} />
        <AuthStack.Screen key={resetPasswordCompletePath} name={resetPasswordCompletePath} component={ResetPasswordCompleteScreen} />
        <AuthStack.Screen key={verifyEmailPath} name={verifyEmailPath} component={VerifyEmailScreen} />
        <AuthStack.Screen key={registerCompletePath} name={registerCompletePath} component={RegisterCompleteScreen} />
        <AuthStack.Screen key={termAndUsePath} name={termAndUsePath} component={TermAndUseScreen} />
      </AuthStack.Navigator>
    </NavigationIndependentTree>
  )
}

export default AuthStackScreens
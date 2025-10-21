import React, { FC, JSX } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree } from '@react-navigation/native';
import { authCompletePath, chooseIdolPath, resetPasswordPath, signInPath, signUpPath, termAndUsePath, verifyEmailPath } from 'constants/pathLocations';
import SignInScreen from 'screens/Auth/SignIn/SignInScreen';
import SignUpScreen from 'screens/Auth/SignUp/SignUpScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPassword/ResetPasswordScreen';
import VerifyEmailScreen from 'screens/Auth/VerifyEmail/VerifyEmailScreen';
import TermAndUseScreen from 'screens/Auth/TermAndUse/TermAndUseScreen';
import AuthCompleteScreen from 'screens/Auth/AuthComplete/AuthCompleteScreen';
import ChooseIdolScreen from 'screens/Auth/ChooseIdol/ChooseIdolScreen';

const AuthStackScreens: FC = (): JSX.Element => {
  const AuthStack = createStackNavigator();
  return (
    <NavigationIndependentTree>
      <AuthStack.Navigator screenOptions={{ headerShown: false, freezeOnBlur: true }}>
        <AuthStack.Screen key={signInPath} name={signInPath} component={SignInScreen}/>
        <AuthStack.Screen key={signUpPath} name={signUpPath} component={SignUpScreen} />
        <AuthStack.Screen key={resetPasswordPath} name={resetPasswordPath} component={ResetPasswordScreen} />
        <AuthStack.Screen key={verifyEmailPath} name={verifyEmailPath} component={VerifyEmailScreen} />
        <AuthStack.Screen key={authCompletePath} name={authCompletePath} component={AuthCompleteScreen} />
        <AuthStack.Screen key={termAndUsePath} name={termAndUsePath} component={TermAndUseScreen} />
        <AuthStack.Screen key={chooseIdolPath} name={chooseIdolPath} component={ChooseIdolScreen} />
      </AuthStack.Navigator>
    </NavigationIndependentTree>
  )
}

export default AuthStackScreens
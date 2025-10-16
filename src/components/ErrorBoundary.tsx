import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Linking, Alert } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Bugsnag from '@bugsnag/react-native';
import { Montserrat500, Montserrat400, Montserrat700 } from 'constants/fonts';
import { whiteColor } from 'constants/colors';
import Button from 'components/Button/Button';
import DefaultBackground from 'components/DefaultBackground/DefaultBackground';

// Styled Components
const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const ErrorContent = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 32px;
  width: 100%;
  max-width: 320px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ErrorIcon = styled.Text`
  font-size: ${RFValue(48, 932)}px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled.Text`
  font-family: ${Montserrat700};
  font-size: ${RFValue(24, 932)}px;
  color: ${whiteColor};
  text-align: center;
  margin-bottom: 8px;
`;

const ErrorDescription = styled.Text`
  font-family: ${Montserrat400};
  font-size: ${RFValue(16, 932)}px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 24px;
  line-height: ${RFValue(24, 932)}px;
`;

const ErrorDetails = styled.Text`
  font-family: ${Montserrat400};
  font-size: ${RFValue(12, 932)}px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 32px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: 12px;
`;

const SupportLink = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 12px;
`;

const SupportText = styled.Text`
  font-family: ${Montserrat500};
  font-size: ${RFValue(14, 932)}px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  text-decoration-line: underline;
`;

interface Props {
    children: ReactNode;
    name?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo
        });

        Bugsnag.notify(error);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined
        });
    };

    handleContactSupport = async () => {
        const supportEmail = 'support@invitedonly.app'; // Replace with your support email
        const subject = 'App Error Report';
        const body = `Hi Support Team,

I encountered an error in the app:

Error: ${this.state.error?.message || 'Unknown error'}
Component: ${this.props.name || 'Unknown'}
Timestamp: ${new Date().toISOString()}

Please help me resolve this issue.

Best regards`;

        const emailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        try {
            const canOpen = await Linking.canOpenURL(emailUrl);
            if (canOpen) {
                await Linking.openURL(emailUrl);
            } else {
                Alert.alert(
                    'Contact Support',
                    `Please email us at: ${supportEmail}`,
                    [
                        {
                            text: 'Copy Email', onPress: () => {
                                // You might want to add clipboard functionality here
                                Alert.alert('Email Address', supportEmail);
                            }
                        },
                        { text: 'OK' }
                    ]
                );
            }
        } catch (error) {
            Alert.alert(
                'Contact Support',
                `Please email us at: ${supportEmail}`,
                [{ text: 'OK' }]
            );
        }
    };

    render() {
        if (this.state.hasError) {
            const isProductionError = true;

            return (
                <DefaultBackground>
                    <ErrorContainer>
                        <ErrorContent>
                            <ErrorIcon>😵</ErrorIcon>

                            <ErrorTitle>Oops! Something went wrong</ErrorTitle>

                            <ErrorDescription>
                                We&apos;re sorry for the inconvenience. The app encountered an unexpected error.
                            </ErrorDescription>

                            {!isProductionError && this.state.error && (
                                <ErrorDetails>
                                    {this.state.error.message}
                                </ErrorDetails>
                            )}

                            <ButtonContainer>
                                <Button
                                    title="Try Again"
                                    onPress={this.handleReset}
                                    variant="default"
                                />

                                <Button
                                    title="Contact Support"
                                    onPress={this.handleContactSupport}
                                    variant="outline"
                                />
                            </ButtonContainer>

                            <SupportLink onPress={this.handleContactSupport}>
                                <SupportText>Need help? Contact our support team</SupportText>
                            </SupportLink>
                        </ErrorContent>
                    </ErrorContainer>
                </DefaultBackground>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 
import { FC, ReactElement } from 'react';
import { ActivityIndicator, Button as ButtonAntd } from '@ant-design/react-native';

//import components
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ButtonProps } from 'typescript/interfaces';
import { Montserrat500 } from 'constants/fonts';
import { screenHeight } from 'constants/common';
import { blackColor, grayColor, whiteColor } from 'constants/colors';

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonContatinerStyle,
  buttonStyle,
  buttonTitleStyle,
  loading = false,
  variant = 'default',
  id,
  testID,
  leftIcon,
}): ReactElement => {
  const styles = {
    ['default']: {
      container: buttonContatinerStyle,

      activeStyle: {
        backgroundColor: 'rgba(240, 240, 240, 1)',
        borderRadius: 85,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: whiteColor,
        height: screenHeight / 18,
        maxHeight: 64,
      } as ViewStyle,
      defaultRawText: {
        color: '#010101',
        fontFamily: Montserrat500,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,
        borderColor: 'transparent',
      },
      defaultHighlight: {
        backgroundColor: 'rgba(255, 255,255, 0.8)',
      },
      defaultHighlightText: {
        color: blackColor,
      } as TextStyle,
    },
    ['gray']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: 'rgba(55, 55, 55, 1)',
        borderRadius: 85,
        borderColor: 'rgba(55, 55, 55, 1)',
        borderWidth: 1,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: 'rgba(32, 32, 32, 1)',
        height: screenHeight / 18,
        maxHeight: 64,
        borderColor: 'rgba(32, 32, 32, 1)',
        borderWidth: 1,
      } as ViewStyle,
      defaultRawText: {
        color: whiteColor,
        fontFamily: Montserrat500,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        marginLeft: leftIcon ? 8 : 0,
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,
        borderColor: 'transparent',
      },
      defaultHighlight: {
        backgroundColor: 'rgba(255, 255,255, 0.1)',
      },
      defaultHighlightText: {
        color: blackColor,
      } as TextStyle,
    },
    ['outline']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 85,
        borderColor: 'rgba(50, 50, 50, 1)',
        borderWidth: 1,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: 'transparent',
        height: screenHeight / 18,
        maxHeight: 64,
        borderColor: 'rgba(32, 32, 32, 1)',
        borderWidth: 1,
      } as ViewStyle,
      defaultRawText: {
        color: whiteColor,
        fontFamily: Montserrat500,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        marginLeft: leftIcon ? 8 : 0,
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(32, 32, 32, 1)',
      },
      defaultDisabledRawText: {
        color: whiteColor,
      },
      defaultHighlight: {
        backgroundColor: 'rgba(255, 255,255, 0.05)',
      },
      defaultHighlightText: {
        color: whiteColor,
      } as TextStyle,
    },
    ['transparent']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 15,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 18,
        backgroundColor: 'transparent',
        borderWidth: 0,
        height: screenHeight / 14,
        maxHeight: 64,
      },
      defaultRawText: {
        color: whiteColor,
        fontFamily: Montserrat500,
        textAlign: 'center' as const,
        fontSize: RFValue(20, 932),
        marginLeft: leftIcon ? 8 : 0,
        ...buttonTitleStyle,
      },
      defaultHighlight: {
        backgroundColor: 'transparent',
      },
      defaultHighlightText: {
        color: whiteColor,
      },
    },
    ['whatsapp']: {
      container: buttonContatinerStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: 'rgba(37, 211, 102, 0.6)',
        borderColor: 'transparent',
        height: screenHeight / 18,
        maxHeight: 64,
      } as ViewStyle,
      defaultRawText: {
        color: whiteColor,
        fontFamily: Montserrat500,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        marginLeft: leftIcon ? 8 : 0,
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,

      },
      defaultHighlight: {
        backgroundColor: 'rgba(37, 211, 102, 0.2)',
      },
      defaultHighlightText: {
        color: whiteColor,
      } as TextStyle,
    },
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={blackColor} size="small" />;
    }

    if (leftIcon) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {leftIcon}
          <Text style={styles[variant].defaultRawText}>{title}</Text>
        </View>
      );
    }

    return title;
  };

  return (
    <ButtonAntd activeStyle={styles[variant].activeStyle} testID={testID} id={id} style={buttonStyle} onPress={onPress} disabled={disabled || loading} styles={styles[variant]}>
      {renderContent()}
    </ButtonAntd>
  );
};

export default Button;

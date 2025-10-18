import { FC, ReactElement } from 'react';
import { ActivityIndicator, Button as ButtonAntd } from '@ant-design/react-native';
import { View, Text, TextStyle, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ButtonProps } from 'typescript/interfaces';
import { Montserrat500, Montserrat700 } from 'constants/fonts';
import { screenHeight } from 'constants/common';
import {
  whiteColor,
  white10Color,
  white40Color,
  white64Color,
  blackColor,
  primaryColor,
  grayColor,
  transparentWhite30Color,
  primary1Color,
  gray1Color,
} from 'constants/colors';

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
        backgroundColor: primary1Color,
        borderRadius: 85,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: primaryColor,
        height: screenHeight / 18,
        maxHeight: 64,
      } as ViewStyle,
      defaultRawText: {
        color: whiteColor,
        fontFamily: Montserrat700,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: grayColor,
        borderColor: 'transparent',
      },
      defaultHighlight: {
        backgroundColor: white10Color,
      },
      defaultHighlightText: {
        color: whiteColor,
      } as TextStyle,
    },
    ['gray']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: gray1Color,
        borderRadius: 85,
        borderColor: gray1Color,
        borderWidth: 1,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: grayColor,
        height: screenHeight / 18,
        maxHeight: 64,
        borderColor: grayColor,
        borderWidth: 1,
      } as ViewStyle,
      defaultRawText: {
        color: blackColor,
        fontFamily: Montserrat700,
        textAlign: 'center' as const,
        fontSize: RFValue(14, 932),
        marginLeft: leftIcon ? 8 : 0,
        ...buttonTitleStyle,
      } as TextStyle,
      defaultDisabledRaw: {
        backgroundColor: gray1Color,
      },
      defaultHighlight: {
        backgroundColor: gray1Color,
      },
      defaultHighlightText: {
        color: whiteColor,
      } as TextStyle,
    },
    ['outline']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: white10Color,
        borderRadius: 85,
        borderColor: white40Color,
        borderWidth: 1,
      } as ViewStyle,
      defaultRaw: {
        borderRadius: 100,
        backgroundColor: 'transparent',
        height: screenHeight / 18,
        maxHeight: 64,
        borderColor: white40Color,
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
        borderColor: white10Color,
        backgroundColor: 'transparent',
      },
      defaultDisabledRawText: {
        color: white64Color,
      },
      defaultHighlight: {
        backgroundColor: transparentWhite30Color,
      },
      defaultHighlightText: {
        color: whiteColor,
      } as TextStyle,
    },
    ['transparent']: {
      container: buttonContatinerStyle,
      activeStyle: {
        backgroundColor: white10Color,
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
        backgroundColor: white10Color,
      },
      defaultHighlightText: {
        color: whiteColor,
      },
    },
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={whiteColor} size="small" />;
    }

    if (leftIcon) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {leftIcon}
          <Text style={styles[variant].defaultRawText}>{title}</Text>
        </View>
      );
    }

    return <Text style={styles[variant].defaultRawText}>{title}</Text>;
  };

  return (
    <ButtonAntd
      activeStyle={styles[variant].activeStyle}
      testID={testID}
      id={id}
      style={Object.assign({}, styles[variant].defaultRaw, buttonStyle)}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {renderContent()}
    </ButtonAntd>
  );
};

export default Button;

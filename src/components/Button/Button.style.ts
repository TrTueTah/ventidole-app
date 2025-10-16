import styled from 'styled-components/native';
import { Pressable, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Montserrat500 } from 'constants/fonts';
import { screenHeight } from 'constants/common';
import { blackColor, grayColor, whiteColor } from 'constants/colors';

interface StyledButtonProps {
    variant: 'default' | 'gray' | 'outline' | 'transparent';
    disabled: boolean;
    loading: boolean;
}

interface StyledTextProps {
    variant: 'default' | 'gray' | 'outline' | 'transparent';
    disabled: boolean;
    loading: boolean;
}

// Helper functions
const getRadiusConfig = (variant: string) => {
    switch (variant) {
        case 'transparent':
            return { normal: 18, pressed: 12 };
        default:
            return { normal: 100, pressed: 80 };
    }
};

const getVariantStyle = (variant: string, pressed: boolean, disabled: boolean) => {
    const radiusConfig = getRadiusConfig(variant);
    const baseRadius = pressed ? radiusConfig.pressed : radiusConfig.normal;

    switch (variant) {
        case 'gray':
            return {
                backgroundColor: disabled
                    ? grayColor
                    : pressed
                        ? 'rgba(45, 45, 45, 1)'
                        : 'rgba(32, 32, 32, 1)',
                borderColor: 'rgba(32, 32, 32, 1)',
                borderWidth: 1,
                borderRadius: baseRadius,
            };
        case 'outline':
            return {
                backgroundColor: disabled
                    ? 'transparent'
                    : pressed
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'transparent',
                borderColor: 'rgba(32, 32, 32, 1)',
                borderWidth: 1,
                borderRadius: baseRadius,
            };
        case 'transparent':
            return {
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderRadius: baseRadius,
            };
        default: // 'default'
            return {
                backgroundColor: disabled
                    ? grayColor
                    : pressed
                        ? 'rgba(240, 240, 240, 1)'
                        : whiteColor,
                borderRadius: baseRadius,
            };
    }
};

const getTextColor = (variant: string, pressed: boolean, disabled: boolean) => {
    if (disabled) {
        return variant === 'outline' ? whiteColor : '#888';
    }

    switch (variant) {
        case 'gray':
        case 'outline':
        case 'transparent':
            return whiteColor;
        default:
            return pressed ? blackColor : '#010101';
    }
};

const getRippleConfig = (variant: string) => {
    switch (variant) {
        case 'gray':
            return { color: 'rgba(255, 255, 255, 0.1)', borderless: false };
        case 'outline':
            return { color: 'rgba(255, 255, 255, 0.05)', borderless: false };
        case 'transparent':
            return { color: 'rgba(255, 255, 255, 0.1)', borderless: false };
        default:
            return { color: 'rgba(0, 0, 0, 0.1)', borderless: false };
    }
};

const getHeight = (variant: string) => {
    return variant === 'transparent' ? screenHeight / 14 : screenHeight / 18;
};

export const StyledButton = styled(Pressable).attrs<StyledButtonProps>(({ variant }: StyledButtonProps) => ({
    android_ripple: getRippleConfig(variant),
})) <StyledButtonProps>`
  height: ${({ variant }: StyledButtonProps) => getHeight(variant)}px;
  max-height: 64px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled, loading }: StyledButtonProps) => (disabled || loading) ? 0.6 : 1};
  
  ${({ variant, disabled, loading }: StyledButtonProps) => {
        const pressed = false; // Default state
        return getVariantStyle(variant, pressed, disabled || loading);
    }}
`;

export const StyledText = styled(Text) <StyledTextProps>`
  font-family: ${Montserrat500};
  text-align: center;
  font-size: ${({ variant }: StyledTextProps) => variant === 'transparent' ? RFValue(20, 932) : RFValue(14, 932)}px;
  color: ${({ variant, disabled, loading }: StyledTextProps) => getTextColor(variant, false, disabled || loading)};
`;

// Export helper functions for dynamic styling in the component
export { getVariantStyle, getTextColor, getRippleConfig, getHeight }; 
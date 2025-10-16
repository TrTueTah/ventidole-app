import FastImage from "react-native-fast-image";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { screenWidth } from "constants/common";
import { blackColor, whiteColor } from "constants/colors";
import { Montserrat500 } from "constants/fonts";


export const Container = styled.View`
    flex: 1;
    background-color: ${blackColor};
    justify-content: center;
    align-items: center;
    padding-horizontal: ${screenWidth / 13};
`;

export const UpdateAvailableImage = styled(FastImage)`
    width: 200px;
    height: 240px;
`;

export const UpdateAvailableTitle = styled.Text`
    color: ${whiteColor};
    font-size: ${RFValue(32, 932)};
    font-family: Montserrat500;
    margin-top: 48px;
`;

export const UpdateAvailableDescription = styled.Text`
    color: ${whiteColor};
    font-size: ${RFValue(16, 932)};
    text-align: center;
    font-family: Montserrat400;
    margin-horizontal: ${screenWidth / 20};
`;

export const ButtonContainer = styled.View`
    
flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 48px;
`;

export const Button = styled.TouchableOpacity`
background-color: rgba(255, 255, 255, 0.08);
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
padding: 4px 12px 4px 12px;
    height: 40px;
    border-radius: 100px;
`;


export const ButtonText = styled.Text`
    
    font-family: ${Montserrat500};
    font-size: ${RFValue(18, 932)};
    color: ${whiteColor};
    text-align: center;
`;
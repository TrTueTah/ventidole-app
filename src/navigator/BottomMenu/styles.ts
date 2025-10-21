import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { blackColor, whiteColor } from 'constants/colors.ts';
import { Montserrat500 } from 'constants/fonts';


const useStyles = () =>
  StyleSheet.create({
    headerStyle: {
      backgroundColor: blackColor,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: 0,
    },
    headerTitleStyle: {
      color: whiteColor,
      fontFamily: Montserrat500,
      fontSize: RFValue(24, 932),
    },
    tabNavigator: {
      backgroundColor: whiteColor,
      borderTopWidth: 0,
      marginTop: 10,
      paddingTop: 10,
      shadowOffset: {
        height: 0,
        width: 0,
      },
    },
  });

export default useStyles;

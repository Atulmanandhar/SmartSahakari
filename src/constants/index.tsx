import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {GlobalStyles} from './globalStyles';

const Spacing = {
  hs: wp('5%'),
  vs: hp('2%'),
};
const FontSizes = {
  small: hp('2.2%'),
  medium: hp('2.4%'),
  large: hp('2.6%'),
  xlarge: hp('3.3%'),
};

export type fontFamilyType = {
  poppinsLight: string;
  poppinsMedium: string;
  poppinsRegular: string;
  poppinsSemiBold: string;
  poppinsThin: string;
  poppinsExtraBold: string;
  poppinsBold: string;
};

const FontFamily = {
  poppinsLight: 'Poppins-Light',
  poppinsMedium: 'Poppins-Medium',
  poppinsRegular: 'Poppins-Regular',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsThin: 'Poppins-Thin',
  poppinsExtraBold: 'Poppins-ExtraBold',
  poppinsBold: 'Poppins-Bold',
};

const Colors = {
  primaryBlue: '#007694',
  // primaryDarkBlue:"#56328c",
  primaryDarkBlue: '#1b1562',
  // primaryDarkBlue: '#2B0548',
  secondaryBlue: 'rgba(0, 118, 148, 0.6)',
  dangerRed: '#FB5762',
  switchGreen: '#5ED64D',
  white: '#fff',
  black: '#333',
  lightGrey: '#F3F3F3',
  grey: '#D3D3D3',
  borderColor: '#707070',
};

// const EMAIL_REGEX =
//   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export {Spacing, FontSizes, Colors, FontFamily, GlobalStyles, EMAIL_REGEX};

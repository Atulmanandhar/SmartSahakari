import React from 'react';
import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import {Colors, FontFamily, FontSizes, fontFamilyType} from '../constants';

interface CustomTextProps {
  label: string;
  style?: TextStyle;
  fontSize?: number;
  fontFamily?: string;
  numberOfLines?: number;
  color?: string;
}

const CustomText = ({
  label,
  style,
  fontSize,
  fontFamily,
  numberOfLines,
  color,
}: CustomTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...{numberOfLines}}
      //   style={styles.textStyle(style, fontSize, fontFamily, theme)}
      style={[
        styles.textStyle2,
        {...style},
        {fontSize, color},
        {fontFamily: fontFamily},
      ]}>
      {label}
    </Text>
  );
};

CustomText.defaultProps = {
  style: {},
  fontSize: FontSizes.small,
  fontFamily: FontFamily.poppinsMedium,
  numberOfLines: 0,
  label: '',
};

export default CustomText;

const styles = StyleSheet.create({
  textStyle2: {},
});

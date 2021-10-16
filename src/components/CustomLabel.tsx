import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomText from './CustomText';
import {GlobalStyles, FontSizes, FontFamily} from '../constants';
interface Props {
  title: string;
  value: string | number;
}

const CustomLabel = ({title, value}: Props) => {
  return (
    <View
      style={[
        GlobalStyles.row,
        {
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        },
      ]}>
      <CustomText
        label={title}
        fontSize={FontSizes.medium}
        fontFamily={FontFamily.poppinsSemiBold}
      />
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          flex: 1,
        }}>
        <CustomText label={` ${value}`} fontSize={FontSizes.medium} />
      </View>
    </View>
  );
};

export default CustomLabel;

const styles = StyleSheet.create({});

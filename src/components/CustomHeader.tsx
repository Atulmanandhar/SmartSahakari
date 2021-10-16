import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Colors, FontFamily, FontSizes, Spacing} from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomText from './CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StatusBarHeight = StatusBar.currentHeight;

interface Props {
  backgroundColor?: string;
  leftIconPress?: () => void;
  leftIcon?: string;
  leftIconColor?: string;
  labelName: string;
  rightIconPress?: () => void;
  rightIcon?: string;
}

const CustomHeader = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.primaryDarkBlue,
        paddingHorizontal: wp('5%'),
        paddingVertical: Spacing.vs,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {props.leftIconPress && (
          <TouchableOpacity onPress={props.leftIconPress}>
            <Ionicons
              name={props.leftIcon!}
              size={28}
              color={props.leftIconColor ? props.leftIconColor : Colors.white}
            />
          </TouchableOpacity>
        )}

        <CustomText
          color={Colors.white}
          label={props.labelName}
          fontFamily={FontFamily.poppinsMedium}
          fontSize={FontSizes.small}
          style={{marginLeft: wp('5%')}}
        />
      </View>
      {props.rightIconPress && (
        <TouchableOpacity onPress={props.rightIconPress}>
          <Ionicons
            name={props.rightIcon!}
            size={25}
            color={props.leftIconColor ? props.leftIconColor : Colors.white}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default CustomHeader;

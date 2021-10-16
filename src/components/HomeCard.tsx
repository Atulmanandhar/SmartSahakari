import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, FontSizes, Spacing} from '../constants';
import Card from './Card';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';
import {appStackParams, appStack} from '../navigation/navigationParams';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  label: string;
  iconName: string;
  screenName: appStack;
}

const HomeCard = ({label, iconName, screenName}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<appStackParams>>();
  return (
    <Card style={styles.rootView}>
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName)}
        style={styles.touchView}>
        <Ionicon
          name={iconName}
          size={FontSizes.xlarge * 2}
          color={Colors.primaryDarkBlue}
        />
        <CustomText
          label={label}
          style={{marginTop: hp('2%'), textAlign: 'center'}}
        />
      </TouchableOpacity>
    </Card>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  rootView: {
    width: wp(40),
    height: hp(20),
  },
  touchView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
  },
});

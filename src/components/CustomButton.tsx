import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, FontFamily, FontSizes, Spacing} from '../constants';

/**
 * This function will create a custom button accepting the following props
 * @param {string} label Label for the button
 * @param {function} OnPress OnPress function
 * @param {object} buttonStyle style object for the buttonContainer
 * @param {object} textStyle style object for the textComponent
 * @returns {React.Component} React Component
 */

interface Props {
  label: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

function CustomButton({
  label,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  loading,
}: Props) {
  let disableBtn = false;
  if (loading) {
    disableBtn = true;
  }
  if (disabled) {
    disableBtn = true;
  }
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        disabled={disableBtn}
        activeOpacity={0.5}
        style={[
          styles.buttonContainer,
          buttonStyle,
          disabled && styles.disabledContainer,
        ]}
        onPress={onPress}>
        <View style={styles.buttonTextContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.white} />
          ) : (
            <Text
              style={[styles.buttonText, textStyle]}
              allowFontScaling={false}>
              {label}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

CustomButton.defaultProps = {
  disabled: false,
  loading: false,
};

export default CustomButton;

const styles = StyleSheet.create({
  mainView: {
    // overflow: 'hidden',
    // backgroundColor:"red",
    borderRadius: 15,
  },

  buttonContainer: {
    width: wp('80%'),
    backgroundColor: Colors.primaryDarkBlue,
    height: Spacing.vs * 3.5,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  disabledContainer: {
    backgroundColor: Colors.grey,
  },
  buttonTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },

  buttonText: {
    fontFamily: FontFamily.poppinsMedium,
    fontSize: FontSizes.medium,
    color: Colors.white,
    textAlign: 'center',
  },
});

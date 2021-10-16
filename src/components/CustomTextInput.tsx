import React from 'react';
import {forwardRef} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontFamily, FontSizes, Colors, Spacing} from '../constants';
import CustomText from './CustomText';
// import useOrientationChange from '../hooks/useOrientationChange';

interface Props {
  containerStyle?: ViewStyle;
  placeholder: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onBlur?: () => void;
  error?: any;
  errorText?: string;
  isTouched?: boolean;
}
interface refProps {
  ref: any;
}

const CustomTextInput = forwardRef((props: Props, ref: any) => {
  return (
    <>
      <View
        style={[
          styles.textInputContainer,
          props.containerStyle,
          props.error && {borderColor: Colors.dangerRed},
        ]}>
        <TextInput
          ref={ref}
          allowFontScaling={false}
          style={styles.input}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.black}
          onChangeText={props.onChangeText}
          value={props.value}
          onSubmitEditing={props.onSubmitEditing}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
          onBlur={props.onBlur}
        />
      </View>
      {props.error && (
        <CustomText
          label={props.errorText!}
          color={Colors.dangerRed}
          fontSize={FontSizes.small - 2}
        />
      )}
    </>
  );
});

CustomTextInput.defaultProps = {
  //   onChangeText: () => {},
  //   value: '',
  onSubmitEditing: () => {},
  placeholder: 'Title',
  keyboardType: 'default',
  containerStyle: {},
  secureTextEntry: false,
  autoCapitalize: 'sentences',
};
export default CustomTextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    height: hp('8%'),
    borderRadius: 10,
    marginVertical: Spacing.vs,
    backgroundColor: Colors.white,
    borderColor: Colors.primaryDarkBlue,
    borderWidth: 3,
    paddingHorizontal: Spacing.hs,
    justifyContent: 'center',
  },
  input: {
    color: Colors.black,
    fontSize: FontSizes.medium,
    fontFamily: FontFamily.poppinsMedium,
    // borderWidth: 1,
  },
});

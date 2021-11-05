import React, {useState} from 'react';
import {forwardRef} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  passwordType?: boolean;
}
interface refProps {
  ref: any;
}

const CustomTextInput = forwardRef((props: Props, ref: any) => {
  const [secureEntryState, setSecureEntryState] = useState<boolean | undefined>(
    props.secureTextEntry,
  );

  const passwordToggleHandler = () => {
    setSecureEntryState(curr => !curr);
  };

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
          secureTextEntry={secureEntryState}
          autoCapitalize={props.autoCapitalize}
          onBlur={props.onBlur}
        />
        {props.passwordType && (
          <TouchableOpacity
            onPress={passwordToggleHandler}
            style={styles.passwordToggler}>
            <Ionicons
              name={secureEntryState ? 'eye-outline' : 'eye-off-outline'}
              size={25}
              color={Colors.primaryDarkBlue}
            />
          </TouchableOpacity>
        )}
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
  passwordType: false,
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
  passwordToggler: {
    position: 'absolute',
    right: 10,
  },
});

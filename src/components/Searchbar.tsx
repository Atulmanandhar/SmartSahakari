import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Colors, Spacing, FontSizes} from '../constants';

interface Props {
  onChangeText: Dispatch<SetStateAction<string | undefined>>;
  value: string | undefined;
  onSubmitEditing: () => void;
}

const SearchBar = ({onChangeText, value, onSubmitEditing}: Props) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.input}
        allowFontScaling={false}
        placeholder="Search"
        placeholderTextColor={Colors.black}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={onChangeText.bind(this, '')}>
        {value === '' ? (
          <Ionicon name="search-sharp" size={FontSizes.large} />
        ) : (
          <Ionicon name="ios-close" size={FontSizes.large} />
        )}
      </TouchableOpacity>
    </View>
  );
};
// SearchBar.defaultProps = {
//   onChangeText: () => {},
//   value: '',
//   onSubmitEditing: () => {},
// };
export default SearchBar;

const styles = StyleSheet.create({
  textInputContainer: {
    height: hp('8%'),
    borderRadius: 10,
    // marginVertical: Utils.Spacing.vs,
    marginTop: Spacing.vs * 2,
    backgroundColor: Colors.white,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    paddingHorizontal: Spacing.hs,
    justifyContent: 'center',
  },
  input: {
    color: Colors.black,
    fontSize: FontSizes.medium,
    // borderWidth: 1,
  },
  iconContainer: {
    position: 'absolute',
    top: hp('2%'),
    right: wp('4%'),
  },
});

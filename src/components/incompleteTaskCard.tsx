import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {GlobalStyles, Colors, Spacing, FontSizes} from '../constants';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appStackParams} from '../navigation/navigationParams';

interface Props {
  itemData: any;
}

const InCompleteTaskCard = ({itemData}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<appStackParams>>();
  return (
    <Pressable
      android_ripple={{
        color: Colors.grey,
      }}
      onPress={() =>
        navigation.navigate('IndividualIncompleteTask', {
          itemProp: itemData.item,
        })
      }>
      <View style={styles.itemView}>
        <CustomText
          label={itemData?.index + 1 ?? '-'}
          style={{marginRight: Spacing.hs}}
        />
        <View>
          <CustomText label={itemData.item?.name ?? ''} />
          <CustomText
            label={itemData.item?.location ?? ''}
            fontSize={FontSizes.small * 0.9}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default InCompleteTaskCard;
const styles = StyleSheet.create({
  itemView: {
    ...GlobalStyles.row,
    ...GlobalStyles.paddingSpacing,
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});

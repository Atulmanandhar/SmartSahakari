import React from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, GlobalStyles, Spacing} from '../constants';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appStackParams} from '../navigation/navigationParams';

interface Props {
  itemData: any;
}

const MyClientsCard = ({itemData}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<appStackParams>>();
  return (
    <Pressable
      android_ripple={{
        color: Colors.grey,
      }}
      onPress={() =>
        navigation.navigate('ClientDetails', {
          customerId: itemData.item.customerId,
        })
      }>
      <View style={GlobalStyles.paddingSpacing}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('ClientDetails')}> */}

        <View style={styles.itemView}>
          <CustomText
            label={itemData.index + 1}
            style={{marginRight: Spacing.hs}}
          />

          <View>
            <CustomText label={itemData.item?.name ?? ''} />
            <CustomText label={itemData.item?.location ?? ''} />
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </View>
    </Pressable>
  );
};

export default MyClientsCard;

const styles = StyleSheet.create({
  itemView: {
    ...GlobalStyles.row,
    alignItems: 'center',
  },
});

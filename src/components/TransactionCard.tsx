import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontSizes, GlobalStyles, Spacing, Colors} from '../constants';
import CustomText from './CustomText';
import longDateHelper from '../redux/helpers/longDateHelper';

interface Props {
  itemData: any;
}
// style={[styles.transactionColor, {backgroundColor: props.color}]}
const TransactionCard = ({itemData}: Props) => {
  return (
    <Card style={styles.card}>
      <View style={GlobalStyles.row}>
        <View
          style={[
            styles.transactionColor,
            {
              backgroundColor:
                itemData.item.transactionType === 'DEPOSIT'
                  ? Colors.primaryDarkBlue
                  : Colors.dangerRed,
            },
          ]}
        />
        <View style={styles.content}>
          <CustomText
            label={longDateHelper(itemData.item.date)}
            fontSize={FontSizes.small - 2}
          />
          <CustomText
            label={`Transaction Type: ${itemData.item.transactionType}`}
          />
          <CustomText label={`Total Amount: ${itemData.item.amount}`} />
        </View>
      </View>
    </Card>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    height: hp(15),
    overflow: 'hidden',
  },
  transactionColor: {
    height: hp(15),
    width: wp(2.5),
    borderRadius: 20,
  },
  content: {
    justifyContent: 'center',
    marginLeft: Spacing.hs,
  },
});

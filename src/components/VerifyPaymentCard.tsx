import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FontSizes, GlobalStyles, Spacing} from '../constants';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import longDateHelper from '../redux/helpers/longDateHelper';

interface Props {
  onVerifyPress: (id: string) => void;
  id: string | any;
  date: string;
  isSubmitting: boolean;
}

const VerifyPaymentCard = ({onVerifyPress, id, date, isSubmitting}: Props) => {
  return (
    <Card style={styles.card}>
      <CustomText label={`Batch Id : ${id}`} fontSize={FontSizes.small - 2} />
      <CustomText label={longDateHelper(date)} fontSize={FontSizes.small - 2} />
      <CustomButton
        label="Verify Payment"
        onPress={() => onVerifyPress(id)}
        buttonStyle={{
          height: Spacing.vs * 2.5,
        }}
        textStyle={{fontSize: FontSizes.small}}
        loading={isSubmitting}
      />
      {/* <CustomText label="Transaction Type: Deposit" />
      <CustomText label="Deposit Amount : 500" /> */}
    </Card>
  );
};

export default VerifyPaymentCard;

const styles = StyleSheet.create({
  card: {
    height: hp(18),
    overflow: 'hidden',
    ...GlobalStyles.paddingSpacing,
    justifyContent: 'space-between',
    marginHorizontal: Spacing.hs,
  },
});

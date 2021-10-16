import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import CustomLabel from '../components/CustomLabel';
import HomeCard from '../components/HomeCard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {appStackParams} from '../navigation/navigationParams';
import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../constants';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import TransactionCard from '../components/TransactionCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';

interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'ClientDetails'>;
  route: RouteProp<{params: {customerId: number}}, 'params'>;
}

const renderItem = (itemData: any) => {
  return <TransactionCard itemData={itemData} />;
};

const ClientDetails = ({navigation, route}: Props) => {
  const customersData = useSelector(
    (state: RootState) => state.taskState.collectorsData,
  );
  const individualCustomer = customersData.filter(
    (item: any) => item.customerId === route.params.customerId,
  );
  console.log(individualCustomer);
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Shyam Kirana Pasal Pvt. Ltd."
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      <View style={styles.scrollViewContent}>
        {/* <CustomLabel title="Name:" value="Shyam Kirana Pasal Pvt. Ltd." /> */}
        <CustomLabel
          title="Customer Id:"
          value={individualCustomer[0].customerId}
        />
        <CustomLabel
          title="Location:"
          value={individualCustomer[0].location ?? ''}
        />
        <CustomLabel
          title="Contact:"
          value={individualCustomer[0].mobileNumber ?? ''}
        />
        <CustomLabel
          title="Business Type:"
          value={individualCustomer[0].businessType ?? ''}
        />
        <CustomText
          label={'Last 5 Transactions'}
          style={styles.transactionTitle}
          fontSize={FontSizes.large}
          fontFamily={FontFamily.poppinsSemiBold}
        />
        <FlatList
          data={individualCustomer[0].last5Transactions}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
        {/* <TransactionCard color={Colors.primaryDarkBlue} />
        <TransactionCard color={Colors.primaryDarkBlue} />
        <TransactionCard color={Colors.dangerRed} />
        <TransactionCard color={Colors.primaryDarkBlue} />
        <TransactionCard color={Colors.dangerRed} /> */}
      </View>
    </SafeAreaView>
  );
};

export default ClientDetails;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollViewContent: {
    ...GlobalStyles.screen,
    paddingVertical: Spacing.vs,
    paddingHorizontal: Spacing.hs,
  },
  transactionTitle: {
    marginTop: Spacing.vs,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primaryDarkBlue,
  },
});

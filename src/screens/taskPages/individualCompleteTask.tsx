import {RouteProp} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import CustomLabel from '../../components/CustomLabel';
import {GlobalStyles} from '../../constants';

import {appStackParams} from '../../navigation/navigationParams';

interface Props {
  navigation: NativeStackNavigationProp<
    appStackParams,
    'IndividualCompleteTask'
  >;
  route: RouteProp<{params: {itemProp: any}}, 'params'>;
}

const individualCompleteTask = ({navigation, route}: Props) => {
  const {itemProp} = route.params;
  console.log(itemProp);
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Individual Completed Task"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[GlobalStyles.paddingSpacing]}>
        <CustomLabel title="Name:" value={itemProp.name} />
        <CustomLabel title="Location:" value={itemProp.location} />
        <CustomLabel title="Mobile Number:" value={itemProp.mobileNumber} />
        <CustomLabel title="Business Type:" value={itemProp.businessType} />
        <CustomLabel title="Customer Id:" value={itemProp.customerId} />
        {/* <CustomLabel
          title="Transaction Type:"
          value={itemProp.formValues.transactionType}
        />
        <CustomLabel
          title="Total Amount:"
          value={`Nrs. ${itemProp.formValues.amount}`}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default individualCompleteTask;

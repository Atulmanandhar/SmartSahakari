import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../../constants';
import {appStackParams} from '../../navigation/navigationParams';
import {useDispatch} from 'react-redux';
import {RootState} from '../../redux/reducers';
import CustomText from '../../components/CustomText';
import {RouteProp} from '@react-navigation/native';
import CustomLabel from '../../components/CustomLabel';
import CustomTextInput from '../../components/CustomTextInput';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';
import {RNToasty} from 'react-native-toasty';
import {completeATask} from '../../redux/actions/taskAction';
import CustomModal from '../../components/CustomModal';

interface Props {
  navigation: NativeStackNavigationProp<
    appStackParams,
    'IndividualIncompleteTask'
  >;
  route: RouteProp<{params: {itemProp: any}}, 'params'>;
}

const IndividualIncompleteTask = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const [amountVal, setAmountVal] = useState<string>('');
  const [transactionIndex, setTransactionIndex] = useState<number>(0);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {itemProp} = route.params;

  const handleSuccess = () => {
    navigation.pop(2);
  };

  const submitModal = () => {
    const transactionType = transactionIndex === 0 ? 'DEPOSIT' : 'WITHDRAW';
    const formValues = {
      customerId: itemProp.formValues.customerId,
      amount: amountVal,
      transactionType,
    };
    dispatch(completeATask(formValues, handleSuccess));
  };

  const submitHandler = () => {
    if (/\S/.test(amountVal)) {
      let isNum = /^\d+$/.test(amountVal);
      if (isNum) {
        toggleModal();
      } else {
        RNToasty.Error({title: 'Amount can only be digits', duration: 1});
      }
    } else {
      RNToasty.Error({title: 'Please enter amount', duration: 1});
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Individual Task"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      <CustomModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <Card style={styles.modalCard}>
          <View>
            <CustomText
              label={'Are you sure you submit this data?'}
              style={styles.textCenter}
            />
            <CustomText
              label={'You will not be able to edit the data again'}
              style={styles.textCenter}
              fontFamily={FontFamily.poppinsBold}
            />
          </View>
          <View style={styles.fullWidth}>
            <CustomLabel title="Name:" value={itemProp.name} />
            <CustomLabel title="Location:" value={itemProp.location} />
            <CustomLabel title="Amount:" value={amountVal} />
            <CustomLabel
              title="Transaction Type:"
              value={transactionIndex === 0 ? 'Deposit' : 'Withdraw'}
            />
          </View>
          <View style={styles.fullWidth}>
            <CustomButton label="Confirm Submission" onPress={submitModal} />
            <TouchableOpacity
              onPress={toggleModal}
              style={{alignSelf: 'center', marginTop: Spacing.vs}}>
              <CustomText label={'Cancel'} />
            </TouchableOpacity>
          </View>
        </Card>
      </CustomModal>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[GlobalStyles.paddingSpacing]}>
        <View>
          <CustomLabel title="Name:" value={itemProp.name} />
          <CustomLabel title="Location:" value={itemProp.location} />
          <CustomLabel title="Mobile Number:" value={itemProp.mobileNumber} />
          <CustomLabel
            title="Customer Id:"
            value={itemProp.formValues.customerId}
          />
          <View style={styles.line} />

          <CustomText
            label="Fill in today's data:"
            fontSize={FontSizes.large}
          />
          <CustomText label="Amount:" />
          <CustomTextInput
            placeholder="Enter Total Amount"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={setAmountVal}
            value={amountVal}
          />
          <CustomText label="Transaction Type:" />

          <View style={styles.customButtonGroup}>
            <Card style={styles.customButton}>
              <TouchableOpacity
                style={[
                  styles.touchWrapper,
                  transactionIndex === 0 && styles.activeButton,
                ]}
                onPress={() => setTransactionIndex(0)}>
                <CustomText
                  label="Deposit"
                  color={transactionIndex === 0 ? Colors.white : Colors.black}
                />
              </TouchableOpacity>
            </Card>
            <Card style={{...styles.customButton}}>
              <TouchableOpacity
                style={[
                  styles.touchWrapper,
                  transactionIndex === 1 && styles.activeButton,
                ]}
                onPress={() => setTransactionIndex(1)}>
                <CustomText
                  label="Withdraw"
                  color={transactionIndex === 1 ? Colors.white : Colors.black}
                />
              </TouchableOpacity>
            </Card>
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitContainer}>
        <CustomButton label="Submit Entry" onPress={submitHandler} />
      </View>
    </SafeAreaView>
  );
};

export default IndividualIncompleteTask;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
    marginVertical: Spacing.vs,
  },
  customButtonGroup: {
    flexDirection: 'row',

    justifyContent: 'space-evenly',
  },
  customButton: {
    width: widthPercentageToDP(40),

    height: heightPercentageToDP(8),
  },
  touchWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: Colors.primaryDarkBlue,
  },
  submitContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'green',
    marginVertical: Spacing.vs,
  },

  //modal

  modalCard: {
    ...GlobalStyles.paddingSpacing,
    height: heightPercentageToDP(50),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  submitButton: {
    backgroundColor: Colors.dangerRed,
  },
  cancelButton: {
    backgroundColor: Colors.white,
  },
  cancelText: {
    color: Colors.black,
  },
  fullWidth: {
    width: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
});

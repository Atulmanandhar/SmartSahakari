import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
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
import {
  completeATask,
  createTodaysTransaction,
} from '../../redux/actions/taskAction';
import CustomModal from '../../components/CustomModal';
import TransactionCard from '../../components/TransactionCard';

interface Props {
  navigation: NativeStackNavigationProp<
    appStackParams,
    'IndividualIncompleteTask'
  >;
  route: RouteProp<{params: {itemProp: any}}, 'params'>;
}

// const renderItem = (itemData: any) => {
//   return <TransactionCard itemData={itemData} />;
// };

const IndividualIncompleteTask = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const [amountVal, setAmountVal] = useState<string>('');
  const [depositVal, setDepositVal] = useState<string>('');
  const [withdrawVal, setWithdrawVal] = useState<string>('');
  const [transactionIndex, setTransactionIndex] = useState<number>(0);
  const [isDeposit, setIsDeposit] = useState<boolean>(false);
  const [isWithdraw, setIsWithdraw] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {itemProp} = route.params;
  const customersData = useSelector(
    (state: RootState) => state.taskState.collectorsData,
  );
  const individualCustomer = customersData.filter(
    (item: any) => item.customerId === itemProp.customerId,
  );

  const toggleTransactionType = (type: string): void => {
    if (type === 'deposit') setIsDeposit(curr => !curr);
    if (type === 'withdraw') setIsWithdraw(curr => !curr);
  };

  const toggleSwitch = () => setIsWithdraw(curr => !curr);

  const handleSuccess = () => {
    navigation.pop(2);
  };

  const submitModal = () => {
    if (isDeposit) {
      const formValues = {
        customerId: itemProp.customerId,
        amount: depositVal,
        transactionType: 'DEPOSIT',
      };
      dispatch(createTodaysTransaction(formValues));
    } else {
      const formValues = {
        customerId: itemProp.customerId,
        amount: '0',
        transactionType: 'DEPOSIT',
      };
      dispatch(createTodaysTransaction(formValues));
    }
    if (isWithdraw) {
      const formValues = {
        customerId: itemProp.customerId,
        amount: withdrawVal,
        transactionType: 'WITHDRAW',
      };
      dispatch(createTodaysTransaction(formValues));
    }
    const data = {
      customerId: itemProp.customerId,
    };

    dispatch(completeATask(data, handleSuccess));
  };

  const submitHandler = () => {
    let errorCount = false;

    if (/\S/.test(depositVal)) {
      let isNum = /^\d+$/.test(depositVal);
      if (isNum) {
        // toggleModal();
      } else {
        errorCount = true;

        RNToasty.Error({
          title: 'Deposit Amount can only be digits',
          duration: 1,
        });
      }
    } else {
      errorCount = true;

      RNToasty.Error({title: 'Please enter deposit amount', duration: 1});
    }

    if (isWithdraw) {
      if (/\S/.test(withdrawVal)) {
        let isNum = /^\d+$/.test(withdrawVal);
        if (isNum) {
          // toggleModal();
        } else {
          errorCount = true;

          RNToasty.Error({
            title: 'Withdrawl Amount can only be digits',
            duration: 1,
          });
        }
      } else {
        errorCount = true;

        RNToasty.Error({title: 'Please enter withdrawl amount', duration: 1});
      }
    }

    if (!errorCount) toggleModal();
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

            <>
              <CustomLabel title="Transaction Type:" value={'Deposit'} />
              <CustomLabel title="Deposit Amount:" value={depositVal} />
            </>
            {isWithdraw && (
              <>
                <CustomLabel title="Transaction Type:" value={'Withdraw'} />
                <CustomLabel title="Withdrawl Amount:" value={withdrawVal} />
              </>
            )}
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
          <CustomLabel title="Customer Id:" value={itemProp.customerId} />
          <View style={styles.line} />

          <CustomText
            label="Fill in today's data:"
            fontSize={FontSizes.large}
          />
          <CustomText label="Transaction Type:" />
          {/* 
          <View style={styles.customButtonGroup}>
            <Card style={styles.customButton}>
              <TouchableOpacity
                style={[
                  styles.touchWrapper,
                  // transactionIndex === 0 && styles.activeButton,
                  isDeposit && styles.activeButton,
                ]}
                onPress={() => toggleTransactionType('deposit')}>
                <CustomText
                  label="Deposit"
                  color={isDeposit ? Colors.white : Colors.black}
                />
              </TouchableOpacity>
            </Card>
            <Card style={{...styles.customButton}}>
              <TouchableOpacity
                style={[
                  styles.touchWrapper,
                  isWithdraw && styles.activeButton,
                  // transactionIndex === 1 && styles.activeButton,
                ]}
                onPress={() => toggleTransactionType('withdraw')}>
                <CustomText
                  label="Withdraw"
                  color={isWithdraw ? Colors.white : Colors.black}
                />
              </TouchableOpacity>
            </Card>
          </View> */}

          <CustomText label="Deposit Amount:" />
          <CustomTextInput
            placeholder="Enter amount to deposit"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={setDepositVal}
            value={depositVal}
          />
          <View style={styles.switchContainer}>
            <CustomText
              label="Withdraw"
              color={Colors.black}
              fontSize={FontSizes.large}
            />
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isWithdraw ? Colors.primaryDarkBlue : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isWithdraw}
            />
          </View>
          {isWithdraw && (
            <>
              <CustomText label="Withdraw Amount:" />
              <CustomTextInput
                placeholder="Enter withdrawl request amount"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={setWithdrawVal}
                value={withdrawVal}
              />
            </>
          )}
        </View>
        <CustomText
          label={'Last 5 Transactions'}
          style={styles.transactionTitle}
          fontSize={FontSizes.large}
          fontFamily={FontFamily.poppinsSemiBold}
        />
        {individualCustomer[0].last5Transactions.map((item: any) => {
          return <TransactionCard itemData={item} key={`${item.id}`} />;
        })}
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
    height: heightPercentageToDP(70),
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

  transactionTitle: {
    marginTop: Spacing.vs,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primaryDarkBlue,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

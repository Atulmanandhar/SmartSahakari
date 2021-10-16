import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../constants';
import {appStackParams} from '../navigation/navigationParams';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import StartPage from './taskPages/startPage';
import {RootState} from '../redux/reducers';
import CustomButton from '../components/CustomButton';
import {submitTransactions, toggleTask} from '../redux/actions/taskAction';
import TaskRunningPage from './taskPages/taskRunningPage';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Card from '../components/Card';
import CustomModal from '../components/CustomModal';

interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'TodaysTask'>;
}

const TodaysTask = ({navigation}: Props) => {
  const [internetState, setInternetState] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const taskState = useSelector((state: RootState) => state.taskState);
  // const netInfo = useNetInfo();
  // useEffect(() => {
  //   if (netInfo.details === null) {
  //     console.log('null state home');
  //   } else if (netInfo.isInternetReachable) {
  //     setInternetState('You are connected to the internet');
  //   } else {
  //     setInternetState('No Internet Connection');
  //   }
  // }, [netInfo]);

  const toggleStateHandler = () => {
    dispatch(toggleTask());
  };

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSuccess = () => {
    setIsSubmitting(false);
    setModalVisible(false);
  };

  const handleFailure = () => {
    setIsSubmitting(false);
    setModalVisible(false);
  };

  const submitTransactionsHandler = () => {
    setIsSubmitting(true);
    dispatch(submitTransactions(handleSuccess, handleFailure));
  };

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Todays Task"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />

      <CustomModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <Card style={styles.modalCard}>
          <CustomText
            label={'Are you sure you want to submit todays work?'}
            style={styles.textCenter}
          />

          <CustomButton
            label="Yes, I'm done for the day"
            onPress={submitTransactionsHandler}
            loading={isSubmitting}
          />
          <TouchableOpacity onPress={toggleModal}>
            <CustomText label={'Cancel'} />
          </TouchableOpacity>
        </Card>
      </CustomModal>

      {/* <View style={{}}> */}
      {taskState.isTaskRunning ? <TaskRunningPage /> : <StartPage />}
      <View style={styles.internetStateContainer}>
        {taskState.isTaskRunning && (
          <CustomButton label="Submit Todays Work" onPress={toggleModal} />
        )}

        {/* <CustomButton label="Toggle State" onPress={toggleStateHandler} />
        <CustomText
          label={internetState}
          style={{textAlign: 'center'}}
          color={
            internetState === 'No Internet Connection'
              ? Colors.dangerRed
              : Colors.primaryBlue
          }
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default TodaysTask;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  internetStateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.vs,
  },
  dayStartContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //modal
  modalCard: {
    ...GlobalStyles.paddingSpacing,
    height: heightPercentageToDP(30),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoutButton: {
    backgroundColor: Colors.dangerRed,
  },
  cancelButton: {
    backgroundColor: Colors.white,
  },
  cancelText: {
    color: Colors.black,
  },
  textCenter: {
    textAlign: 'center',
  },
});

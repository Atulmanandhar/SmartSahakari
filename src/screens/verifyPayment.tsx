import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Colors, GlobalStyles} from '../constants';
import VerifyPaymentCard from '../components/VerifyPaymentCard';
import CustomModal from '../components/CustomModal';
import Card from '../components/Card';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomButton from '../components/CustomButton';
import {appStackParams} from '../navigation/navigationParams';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeBatchStatus,
  clearBatches,
  getInitBatch,
} from '../redux/actions/batchAction';
import {RootState} from '../redux/reducers';

interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'VerifyPayment'>;
}

const VerifyPayment = ({navigation}: Props) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const dispatch = useDispatch();
  const initBatchesData = useSelector(
    (state: RootState) => state.initBatch.initBatches,
  );

  const handleSubmitSuccess = () => {
    navigation.pop();
  };
  const handleSubmitFailure = () => {
    setIsSubmitting(false);
  };

  const submitHandler = (id: any) => {
    setIsSubmitting(true);
    dispatch(changeBatchStatus(id, handleSubmitSuccess, handleSubmitFailure));
  };
  const openModal = (id: any) => {
    setCurrentId(id);
    setModalVisible(true);
  };

  const handleLoader = () => {
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(getInitBatch(handleLoader));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getInitBatch(handleLoader));
    return () => {
      dispatch(clearBatches());
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Verify payment submission"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primaryDarkBlue} />
        </View>
      ) : (
        <>
          <CustomModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <Card style={styles.modalCard}>
              <CustomText
                label={
                  'Confirm that this batch of transactions have been submitted to the bank or sahakari'
                }
                style={GlobalStyles.textCenter}
              />
              <CustomButton
                label="Verify this batch payment"
                onPress={() => submitHandler(currentId)}
                loading={isSubmitting}
              />
            </Card>
          </CustomModal>

          <FlatList
            data={initBatchesData}
            keyExtractor={item => item.date}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            renderItem={({item}) => (
              <VerifyPaymentCard
                onVerifyPress={openModal}
                id={item.batch_id ?? 'N/A'}
                date={item.date}
                isSubmitting={isSubmitting}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default VerifyPayment;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalCard: {
    ...GlobalStyles.paddingSpacing,
    height: hp(25),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

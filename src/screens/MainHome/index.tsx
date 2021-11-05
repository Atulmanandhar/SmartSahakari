import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Applogo from '../../assets/images/logo.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAssignedCollectors,
  startTask,
  startTaskResult,
} from '../../redux/actions/taskAction';
import {RNToasty} from 'react-native-toasty';
import {Colors, GlobalStyles} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {RootState} from '../../redux/reducers';

interface Props {}

const StartPage = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const authState = useSelector((state: RootState) => state.auth.userData);
  const {name, sahakari} = authState;
  const dispatch = useDispatch();
  const handleSuccess = (result: startTaskResult) => {
    if (result.batchIdExists) {
      RNToasty.Show({
        title: 'You are already done for today. Come back tomorrow again',
      });
      setIsSubmitting(false);
    } else {
      dispatch(getAssignedCollectors(result.date, handleFailure));
    }
  };
  const handleFailure = () => {
    setIsSubmitting(false);
  };
  const dayStartHandler = () => {
    setIsSubmitting(true);
    dispatch(startTask(handleSuccess, handleFailure));
  };
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader labelName={sahakari.name} />

      <View style={styles.dayStartContainer}>
        <View style={styles.imageContainer}>
          <Image source={Applogo} style={styles.image} />
        </View>
        <CustomButton
          label="Start your day"
          onPress={dayStartHandler}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  dayStartContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: hp('15'),
    width: wp(60),
    // backgroundColor: 'red',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: Colors.primaryDarkBlue,
  },
});

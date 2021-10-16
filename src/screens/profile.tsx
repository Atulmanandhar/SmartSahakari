import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import {RNToasty} from 'react-native-toasty';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appStackParams, appStackNavProps} from '../navigation/navigationParams';
import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../constants';
import CustomLabel from '../components/CustomLabel';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CustomText from '../components/CustomText';
import {logoutUser} from '../redux/actions/authAction';
import {RootState} from '../redux/reducers';
interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'Profile'>;
  test: string;
}

const Profile = ({navigation, route}: appStackNavProps<'Profile'>) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth.userData);
  const {id, username, name, mobileNumber, sahakari, totalCustomer} = authState;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="My Profile"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      <ScrollView
        style={GlobalStyles.screen}
        contentContainerStyle={[
          GlobalStyles.paddingSpacing,
          {justifyContent: 'space-between', flex: 1},
        ]}>
        <View>
          <CustomLabel title="Id:" value={id} />
          <CustomLabel title="Username:" value={username} />
          <CustomLabel title="Name:" value={name} />
          <CustomLabel title="Contact No:" value={mobileNumber} />
          <CustomLabel title="No. of Clients:" value={totalCustomer} />
          <CustomLabel title="Sahakari:" value={sahakari.name} />
          <CustomLabel title="Sahakari Address:" value={sahakari.location} />
          <CustomLabel
            title="Sahakari Contact:"
            value={sahakari.contactNumber ?? 'N/A'}
          />
        </View>
        <CustomModal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <Card style={styles.modalCard}>
            <CustomText label={'Are you sure you want to Logout?'} />
            <CustomText label={'All unsynced data saved will be lost.'} />
            <CustomButton
              label="Yes Log me out"
              onPress={logoutHandler}
              buttonStyle={styles.logoutButton}
            />
            <TouchableOpacity onPress={toggleModal}>
              <CustomText label={'Cancel'} />
            </TouchableOpacity>
          </Card>
        </CustomModal>
        <View style={[GlobalStyles.container]}>
          <CustomButton label="Logout" onPress={toggleModal} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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
});

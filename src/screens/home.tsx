import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import HomeCard from '../components/HomeCard';
import {useSelector, useDispatch} from 'react-redux';
import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../constants';
import {RootState} from '../redux/reducers';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

interface Props {}

const Home = (props: Props) => {
  const netInfo = useNetInfo();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [internetState, setInternetState] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (netInfo.details === null) {
      console.log('null state home');
    } else if (netInfo.isInternetReachable) {
      setInternetState('You are connected to the internet');
    } else {
      setInternetState('No Internet Connection');
    }
  }, [netInfo]);

  const authState = useSelector((state: RootState) => state.auth.userData);
  const {name, sahakari} = authState;
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader labelName={sahakari.name} />
      {/* <View style={{}}> */}
      <View style={GlobalStyles.marginSpacing}>
        <CustomText
          label={`Welcome ${name}`}
          fontSize={FontSizes.large}
          fontFamily={FontFamily.poppinsBold}
        />
      </View>
      <View>
        <View style={styles.cardContainer}>
          <HomeCard
            label="Today's Task"
            screenName={'TodaysTask'}
            // iconName="documents-outline"
            iconName="newspaper-outline"
          />
          <HomeCard
            label="My Clients"
            screenName={'Clients'}
            iconName="business-outline"
            // iconName="md-business-outline"
            // iconName="map-sharp"
          />
        </View>
        <View style={styles.cardContainer}>
          <HomeCard
            label="Verify Payments"
            screenName={'VerifyPayment'}
            iconName="cash-outline"
          />
          <HomeCard
            label="My Profile"
            screenName={'Profile'}
            iconName="ios-person-circle-outline"
          />
        </View>
      </View>
      <View style={styles.internetStateContainer}>
        <CustomText
          label={internetState}
          style={{textAlign: 'center'}}
          color={
            internetState === 'No Internet Connection'
              ? Colors.dangerRed
              : Colors.primaryBlue
          }
        />
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  internetStateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

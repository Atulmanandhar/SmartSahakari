import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {appStackParams} from './navigationParams';
import {useDispatch} from 'react-redux';
import {
  Profile,
  ClientDetails,
  Home,
  Clients,
  VerifyPayment,
  TodaysTask,
} from '../screens';
import {useNetInfo} from '@react-native-community/netinfo';
import {getUser} from '../redux/actions/authAction';
import IncompleteTasks from '../screens/taskPages/incompleteTaskScreen';
import CompleteTasks from '../screens/taskPages/completeTaskScreen';
import IndividualIncompleteTask from '../screens/taskPages/individualIncompleteTask';
import individualCompleteTask from '../screens/taskPages/individualCompleteTask';
import MainHome from '../screens/MainHome';

interface Props {}
const Stack = createNativeStackNavigator<appStackParams>();

const AppStack = (props: Props) => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    if (netInfo.details === null) {
      console.log('init');
    } else if (netInfo.isInternetReachable) {
      dispatch(getUser('asd'));
    }
  }, [netInfo]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      {/* <Stack.Screen name="MainHome" component={MainHome} /> */}
      <Stack.Screen name="TodaysTask" component={TodaysTask} />

      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="ClientDetails" component={ClientDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Clients" component={Clients} />
      <Stack.Screen name="VerifyPayment" component={VerifyPayment} />
      <Stack.Screen name="IncompleteTasks" component={IncompleteTasks} />
      <Stack.Screen name="CompleteTasks" component={CompleteTasks} />
      <Stack.Screen
        name="IndividualIncompleteTask"
        component={IndividualIncompleteTask}
      />
      <Stack.Screen
        name="IndividualCompleteTask"
        component={individualCompleteTask}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

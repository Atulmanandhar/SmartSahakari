import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type appStackParams = {
  Home: undefined;
  ClientDetails: {customerId: number};
  Profile: undefined;
  Clients: undefined;
  VerifyPayment: undefined;
  TodaysTask: undefined;
  Login: undefined;
  IncompleteTasks: undefined;
  CompleteTasks: undefined;
  IndividualIncompleteTask: {itemProp: any};
  IndividualCompleteTask: {itemProp: any};
};

export type appStack =
  | 'Home'
  | 'ClientDetails'
  | 'Profile'
  | 'Clients'
  | 'VerifyPayment'
  | 'TodaysTask'
  | 'IncompleteTasks'
  | 'CompleteTasks'
  | 'IndividualIncompleteTask'
  | 'IndividualCompleteTask';

export type appStackNavProps<T extends keyof appStackParams> = {
  navigation: NativeStackNavigationProp<appStackParams, T>;
  route: RouteProp<appStackParams, T>;
};

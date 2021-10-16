import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {appStackParams} from './navigationParams';
import {Login} from '../screens';

interface Props {}
const Stack = createNativeStackNavigator<appStackParams>();

const LoginStack = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default LoginStack;

const styles = StyleSheet.create({});

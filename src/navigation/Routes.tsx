import React from 'react';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';
import LoginStack from './LoginStack';
import {RootState} from '../redux/reducers/index';

const Routes: React.FC = () => {
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 20}>
          {refreshToken === null ? <LoginStack /> : <AppStack />}
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default Routes;

import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {Colors} from './src/constants';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/config/store';
interface Props {}

const persistor = persistStore(store);

const App = (props: Props) => {
  StatusBar.setBackgroundColor(Colors.primaryDarkBlue);
  StatusBar.setBarStyle('light-content');
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

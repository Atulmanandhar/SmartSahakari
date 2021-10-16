import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './authReducer';
import tempToken from './tokenReducer';
import taskState from './taskReducer';
import initBatch from './batchReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'taskState'],
};

const rootReducer = combineReducers({auth, tempToken, taskState, initBatch});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);

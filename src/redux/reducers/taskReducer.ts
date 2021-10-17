import {Reducer} from 'redux';
import {LOGOUT_USER} from '../actions/authAction';
import {
  COMPLETE_A_TASK,
  CREATE_TODAYS_TRANSACTION,
  SET_COLLECTOR_DATA,
  START_TASK,
  SUBMIT_TRANSACTIONS_SUCCESS,
  TOGGLE_TASK,
} from '../actions/taskAction';

const initialState = {
  isTaskRunning: false,
  collectorsTask: [],
  todaysDate: '',
  collectorsData: [],
  todaysTransactions: [],
};

const taskReducer: Reducer<any, any> = (state = initialState, action: any) => {
  switch (action.type) {
    case START_TASK:
      return {
        ...state,
        isTaskRunning: true,
      };
    case TOGGLE_TASK:
      return {
        ...state,
        isTaskRunning: !state.isTaskRunning,
      };
    case SET_COLLECTOR_DATA:
      return {
        ...state,
        isTaskRunning: true,
        collectorsData: action.collectorsData,
        collectorsTask: action.customerTask,
        todaysDate: action.todaysDate,
      };

    case COMPLETE_A_TASK:
      return {
        ...state,
        collectorsTask: action.payload,
      };
    case SUBMIT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isTaskRunning: false,
        collectorsTask: [],
      };
    case CREATE_TODAYS_TRANSACTION:
      return {
        ...state,
        todaysTransactions: [...state.todaysTransactions, action.payload],
      };

    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default taskReducer;

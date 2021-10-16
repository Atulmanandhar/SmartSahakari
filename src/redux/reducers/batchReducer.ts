import {Reducer} from 'redux';
import {LOGOUT_USER} from '../actions/authAction';
import {GET_INIT_BATCH_SUCCESS, CLEAR_BATCH} from '../actions/batchAction';

const initialState = {
  initBatches: [],
};

const batchReducer: Reducer<any, any> = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INIT_BATCH_SUCCESS:
      return {...state, initBatches: action.payload};

    case CLEAR_BATCH:
      return {...state, initBatches: []};

    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default batchReducer;

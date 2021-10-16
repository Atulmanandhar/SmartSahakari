import {Reducer} from 'redux';
import {LOGOUT_USER, SUCCESS_SIGNIN} from '../actions/authAction';

const initialState = {
  accessToken: null,
};

const tokenReducer: Reducer<any, any> = (state = initialState, action: any) => {
  switch (action.type) {
    case SUCCESS_SIGNIN:
      const {accessToken} = action;
      return {...state, accessToken};

    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default tokenReducer;

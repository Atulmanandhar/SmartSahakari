import {Reducer} from 'redux';
import {LOGOUT_USER, SUCCESS_SIGNIN} from '../actions/authAction';

const initialState = {
  userData: null,
  // accessToken: null,
  refreshToken: null,
};

const authReducer: Reducer<any, any> = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SIGNIN_USER':
      return {
        ...state,
      };
    case SUCCESS_SIGNIN:
      const {userData, refreshToken} = action;
      return {...state, userData, refreshToken};

    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

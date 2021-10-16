import {RNToasty} from 'react-native-toasty';
import * as api from '../api';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../reducers';

export const SUCCESS_SIGNIN = 'SUCCESS_SIGNIN';

export const LOGOUT_USER = 'LOGOUT_USER';

export const signin =
  (payload: api.login, handleSuccess: () => void, handleError: () => void) =>
  async (dispatch: any) => {
    try {
      const response = await api.apiSigninUser(payload);
      if (response.data.role.name !== 'ROLE_COLLECTOR') {
        RNToasty.Error({title: 'Only Collectors can use the mobile app.'});
        handleError();
      } else {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const userData = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          mobileNumber: response.data.mobileNumber,
          sahakari: response.data.sahakari,
          role: response.data.role.name,
          username: response.data.username,
          totalCustomer: response.data.totalAssignedCustomer,
        };
        handleSuccess();
        dispatch({type: SUCCESS_SIGNIN, userData, accessToken, refreshToken});
      }
    } catch (err: any) {
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
      handleError();
    }
  };

export const getUser =
  (token: string) => async (dispatch: any, getState: any) => {
    try {
      const {
        auth: {refreshToken},
      } = getState();
      const response = await api.apiGetUser(refreshToken);

      const accessToken = response.data.access_token;
      const refreshToken2 = response.data.refresh_token;
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        mobileNumber: response.data.mobileNumber,
        sahakari: response.data.sahakari,
        role: response.data.role.name,
        username: response.data.username,
        totalCustomer: response.data.totalAssignedCustomer,
      };
      // handleSuccess();
      dispatch({
        type: SUCCESS_SIGNIN,
        userData,
        accessToken,
        refreshToken: refreshToken2,
      });
    } catch (err) {
      // RNToasty.Error({title: 'Something went wrong.'});
      // handleError();
    }
  };

export const logoutUser = () => {
  return {type: LOGOUT_USER};
};

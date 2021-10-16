import {RNToasty} from 'react-native-toasty';
import * as api from '../api';

export const GET_INIT_BATCH_SUCCESS = 'GET_INIT_BATCH_SUCCESS';

export const CLEAR_BATCH = 'CLEAR_BATCH';

export const getInitBatch =
  (handleLoader: () => void) => async (dispatch: any, getState: any) => {
    try {
      const {
        tempToken: {accessToken},
      } = getState();
      //do accesstoken validation here

      if (accessToken === null) {
        RNToasty.Error({
          title:
            'Somthing went wrong. Please check for a stable internet connection and try again',
        });
        handleLoader();
        return;
      }

      const response = await api.apiGetInitBatch(accessToken);
      dispatch({type: GET_INIT_BATCH_SUCCESS, payload: response.data});
      handleLoader();
    } catch (err: any) {
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
      handleLoader();
    }
  };

export const clearBatches = () => {
  return {type: CLEAR_BATCH};
};

export const changeBatchStatus =
  (id: any, handleSuccess: () => void, handleFailure: () => void) =>
  async (dispatch: any, getState: any) => {
    try {
      const {
        tempToken: {accessToken},
      } = getState();
      const response = await api.apiSetBatchStatus(accessToken, id);
      RNToasty.Success({
        title: `Batch ${id} has successfully been verified by you.`,
        duration: 1,
      });
      handleSuccess();
    } catch (err: any) {
      console.log(err.response.data.message)
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
      handleFailure();
    }
  };

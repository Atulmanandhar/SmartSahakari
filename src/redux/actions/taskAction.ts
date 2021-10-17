import {RNToasty} from 'react-native-toasty';
import * as api from '../api';
import taskCreator from '../helpers/taskCreator';
import transactionCreator from '../helpers/transactionCreator';
export const START_TASK = 'START_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SET_COLLECTOR_DATA = 'SET_COLLECTOR_DATA';
export const COMPLETE_A_TASK = 'COMPLETE_A_TASK';
export const SUBMIT_TRANSACTIONS_SUCCESS = 'SUBMIT_TRANSACTIONS_SUCCESS';
export const CREATE_TODAYS_TRANSACTION = 'CREATE_TODAYS_TRANSACTION';

export type startTaskResult = {
  collectorId: number;
  date: string;
  batchIdExists: false;
};

export const startTask =
  (
    handleSuccess: (result: startTaskResult) => void,
    handleFailure: () => void,
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      const {
        tempToken: {accessToken},
      } = getState();
      if (accessToken === null) {
        RNToasty.Error({
          title:
            'Somthing went wrong. Please check for a stable internet connection and try again',
        });
        handleFailure();
        return;
      }
      const response = await api.apiGetTaskStatus(accessToken);
      console.log(response.data);
      handleSuccess(response.data.result);
    } catch (err: any) {
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
      handleFailure();
    }
  };
export const toggleTask = () => {
  return {type: TOGGLE_TASK};
};

export const getAssignedCollectors =
  (todaysDate: string, handleFailure: () => void) =>
  async (dispatch: any, getState: any) => {
    try {
      const {
        tempToken: {accessToken},
      } = getState();
      const response = await api.apiGetAssignedCollectors(accessToken);
      const customerTaskCreator = response.data.map((item: any) =>
        taskCreator(item),
      );

      dispatch({
        type: SET_COLLECTOR_DATA,
        collectorsData: response.data,
        customerTask: customerTaskCreator,
        todaysDate,
      });
    } catch (err: any) {
      handleFailure();
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
    }
  };

export const completeATask =
  (data: any, handleSucces: () => void) =>
  async (dispatch: any, getState: any) => {
    const {
      taskState: {collectorsTask},
    } = getState();
    const filteredTask = collectorsTask.filter(
      (item: any) => item.customerId === data.customerId,
    );
    const remainingTask = collectorsTask.filter(
      (item: any) => item.customerId !== data.customerId,
    );
    let editData = {...filteredTask[0], formValues: data, taskStatus: true};
    let finalPayload = [...remainingTask, editData];
    dispatch({type: COMPLETE_A_TASK, payload: finalPayload});
    handleSucces();
  };

export const submitTransactions =
  (handleSuccess: () => void, handleFailure: () => void) =>
  async (dispatch: any, getState: any) => {
    try {
      const {
        taskState: {collectorsTask, todaysDate},
        tempToken: {accessToken},
      } = getState();

      if (accessToken === null) {
        RNToasty.Error({
          title:
            'Somthing went wrong. Please check for a stable internet connection and try again',
        });
        handleFailure();
        return;
      }
      const completedTasks = collectorsTask.filter(
        (item: any) => item.taskStatus === true,
      );
      const customerTaskCreator = completedTasks.map((item: any) =>
        transactionCreator(item),
      );

      const response = await api.apiCreateBatchTransactions(
        accessToken,
        todaysDate,
        customerTaskCreator,
      );
      console.log(response.data);
      handleSuccess();
      RNToasty.Success({
        title: `Succefully submitted ${customerTaskCreator.length} transactions today`,
        duration: 1,
      });
      dispatch({type: SUBMIT_TRANSACTIONS_SUCCESS});
    } catch (err: any) {
      RNToasty.Error({
        title: err.response ? err.response.data?.message : err.message,
      });
      handleFailure();
    }
  };

export const createTodaysTransaction =
  (formValue: any) => async (dispatch: any) => {
    dispatch({type: CREATE_TODAYS_TRANSACTION, payload: formValue});
  };

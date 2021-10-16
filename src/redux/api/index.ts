import axios from 'axios';
export const API_URL = 'https://sahakari-app-demo.herokuapp.com/api';
import {
  apiGetTaskStatus,
  apiGetAssignedCollectors,
  apiCreateBatchTransactions,
} from './task';

import {apiGetInitBatch, apiSetBatchStatus} from './batch';
export interface login {
  username: string;
  password: string;
}
export interface getUserType {
  token: string;
}
//login
export const apiSigninUser = (data: login) =>
  axios.post(`${API_URL}/login`, data);

export const apiGetUser = (token: string) =>
  axios.post(
    `${API_URL}/v1/users/token/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export {apiGetTaskStatus, apiGetAssignedCollectors, apiCreateBatchTransactions};

export {apiGetInitBatch, apiSetBatchStatus};

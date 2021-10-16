import axios from 'axios';
import {API_URL} from '.';

export const apiGetTaskStatus = (accessToken: string) =>
  axios.get(`${API_URL}/v1/batchRecord/collectorStatus`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const apiGetAssignedCollectors = (accessToken: string) =>
  axios.get(`${API_URL}/v1/collector/assignedCustomers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const apiCreateBatchTransactions = (
  accessToken: string,
  todaysDate: string,
  payload: any,
) =>
  axios.post(`${API_URL}/v1/transaction/add/${todaysDate}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

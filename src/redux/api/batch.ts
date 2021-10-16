import axios from 'axios';
import {API_URL} from '.';

export const apiGetInitBatch = (accessToken: string) =>
  axios.get(`${API_URL}/v1/collector/batchStatus/INIT`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const apiSetBatchStatus = (accessToken: string, batchId: string) =>
  axios.post(
    `${API_URL}/v1/batchRecord/${batchId}/status/PENDING`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

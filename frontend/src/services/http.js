import axios from 'axios';
import { baseURL } from './urls';

const axiosInstance = axios.create({
  baseURL,
});

export const http = {
  post: axiosInstance.post,
  get: axiosInstance.get,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

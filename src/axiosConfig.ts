import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['CMReq'] = 'request';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    response.headers['CMERes'] = 'response';
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

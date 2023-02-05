import axios from 'axios'
import { emiter } from 'plugin/event';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(function (config) {
  console.log('request', config);

  const authToken = localStorage.getItem('Auth-token')
  console.log('auth token', authToken)
  if (authToken) {
    config.headers['Authorization'] = 'Bearer ' + authToken
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  console.log(response)
  return response.data;
}, function (error) {
  const { response } = error
  console.log(error);
  // if (response.status === 403) {
  //   emiter.emit('forbiden')
  // }

  return Promise.reject(error);
});

export default instance
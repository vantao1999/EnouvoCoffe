import axios from 'axios';

import Config from '../config/AppSetting';

const API_ROOT = Config.BASE_URL;

axios.defaults.baseURL = API_ROOT;
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  (error) => handleError(error),
);

const handleError = (error) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      // dispatch logout
      // store.dispatch(logout());
    }
  }
  return Promise.reject(error.response || error.request || error.message);
};

const http = {
  setAuthorizationHeader(accessToken) {
    // console.log('accessToken', accessToken);
    axios.defaults.headers.Authorization = `bearer ${accessToken}`;
  },
  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  },
  // postUploadFile(url, data = {}) {
  //   let formData = new FormData();
  //   data.photos.forEach((photo) => {
  //     formData.append('photos', {
  //       uri: photo,
  //       type: 'image/jpg',
  //       name: `${new Date().getTime()}.jpg`,
  //     });
  //   });
  //   return this.post(url, formData);
  // },
  postUploadFile(url, data = {}) {
    let formData = new FormData();

    formData.append('photos', {
      uri: data,
      type: 'image/jpg',
      name: `${new Date().getTime()}.jpg`,
    });
    return this.post(url, formData);
  },
};

export default http;

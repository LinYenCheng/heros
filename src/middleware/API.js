import axios from 'axios';
import Swal from 'sweetalert2';
import { camelizeKeys } from 'humps';

let isModalOpen = false;
const API_URL = 'https://hahow-recruit.herokuapp.com';

/**
 * parse response
 */
function parseBody(response) {
  if (response.status === 200) {
    if (process.env.NODE_ENV === 'development') {
      console.log({
        url: response.config.url,
        result: response.data || response.statusText,
      });
    }
    return response.data || response.statusText;
  }
  return false;
}

/**
 * axios instance
 */
const API = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  responseType: 'json',
});

// response parse
API.interceptors.response.use(
  response => parseBody(camelizeKeys(response)),
  error => {
    // console.warn('Error status', error);
    if (error.response) {
      if (error.response.status === 500) {
        if (!isModalOpen) {
          Swal({
            type: 'error',
            title: '連線或伺服器發生錯誤',
            showConfirmButton: false,
            showCloseButton: true,
            onClose: () => {
              isModalOpen = false;
            },
          });
        }
      }
      return false;
    }
    return Promise.reject(error);
  },
);

export default API;

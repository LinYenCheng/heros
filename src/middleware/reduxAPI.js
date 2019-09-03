import 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import reduxApi from 'redux-api';
import Swal from 'sweetalert2';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const API_URL = 'http://hahow-recruit.herokuapp.com';
const jsonOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};
let isModalOpen = false;
// redux-api documentation: https://github.com/lexich/redux-api/blob/master/docs/DOCS.md
export default reduxApi({
  heroes: {
    url: '/heroes',
    options: jsonOptions,
  },
})
  .use('responseHandler', (err, data) => {
    if (err) {
      console.log(err);
      if (err.status === 500 || err) {
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
    } else if (data) {
      if (data && data.length > 0) {
        return { status: 1, result: camelizeKeys(data) };
      }
    }
    return { status: 0 };
  })
  .use('options', (url, params, getState) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return { headers };
  })
  .use('fetch', adapterFetch(fetch))
  .use('rootUrl', API_URL);

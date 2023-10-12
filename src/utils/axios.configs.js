import axios from 'axios';
import { deleteToken } from '@iso/lib/helpers/localStorage';
import swal from 'sweetalert';
import qs from 'qs';

const BASE_API_URL = process.env.REACT_APP_API_KEY || 'https://api.songkhoegopxanh.com';
// const BASE_API_URL = process.env.REACT_APP_API_KEY || 'http://localhost:6880';

export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1800000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response: { status } } = error;
    if (status === 401) {
      deleteToken();
      window.location.href = "/signin";
    }
    if (status === 403) {
      window.location.href = "/403";
    }
    if (status === 426) {
      swal({
        title: "Thông báo",
        text: "Có sự thay đổi về hệ thống, vui lòng đăng nhập lại.",
        icon: "info",
        buttons: [false, "Ok"],
      }).then((value) => {
        deleteToken();
        window.location.href = "/signin";
      });;
    }
    return Promise.reject(error);
  }
);

api.defaults.headers.common['Authorization'] = localStorage.getItem('USER_TOKEN') === null ? null : `Bearer ${localStorage.getItem('USER_TOKEN')}`;

export function setAuthorization(token) {
  api.defaults.headers.common['Authorization'] = token === null ? token : `Bearer ${token}`;
}

export function removeAuthorization() { //for Logout
  setAuthorization(null);
}

export const exportAxios = (url, model) => {
  return {
    baseURL: `${BASE_API_URL}${url}`,
    timeout: 30000,
    responseType: "blob",
    method: 'get',
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        localStorage.getItem("USER_TOKEN") === null
          ? null
          : `Bearer ${localStorage.getItem("USER_TOKEN")}`,
    },
    params: model,
    paramsSerializer: params => {
      return qs.stringify(params);
    }
  };
};
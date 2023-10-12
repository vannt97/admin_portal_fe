import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

// import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';

import * as authServices from '@iso/services/auth';
import { saveToken, deleteToken, getToken } from '@iso/lib/helpers/localStorage';
import { setAuthorization, removeAuthorization } from '@iso/utils/axios.configs';

const history = createBrowserHistory();
// const fakeApiCall = true; // auth0 or express JWT

//#region LOGIN
export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* ({ payload, cbError }) {
    const { model } = payload;
    try {
      var response = yield call(authServices.login, model);
      if (response.data != null) {
        var { token } = response.data.data;
        yield saveToken(token);
        yield setAuthorization(token);

        yield put({
          type: actions.LOGIN_SUCCESS,
          token: token,
        });
      }
    } catch (e) {
      if (e.response?.data)
        yield cbError(e.response?.data?.ErrorMessage);
      else
        yield cbError();
    }
  });
}
//#endregion

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield deleteToken();
    yield removeAuthorization();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken();
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}

//#region FORGOT PW
export function* forgotPassword() {
  yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload, cbSuccess, cbError }) {
    const { model } = payload;
    try {
      var response = yield call(authServices.forgotPassword, model);
      if (response.data != null) {
        yield cbSuccess();
      }
    } catch (e) {
      if (e.response && e.response.data)
        yield cbError(e.response.data.ErrorMessage);
      else
        yield cbError();
    }
  });
}

export function* checkTokenResetPassword() {
  yield takeEvery(actions.CHECK_TOKEN_RESET_PASSWORD, function* ({ payload, history }) {
    const { model } = payload;
    try {
      var response = yield call(authServices.checkTokenResetPassword, model);
      if (!response.data.success) {
        history.push('/dashboard');
      }
    } catch (e) {
      history.push("/signin")
    }
  })
}

export function* resetPassword() {
  yield takeEvery(actions.RESET_PASSWORD, function* ({ payload, cbSuccess, cbError }) {
    try {
      var { model } = payload;
      var response = yield call(authServices.resetPassword, JSON.stringify(model));
      if (response.data.success) {
        yield cbSuccess();
      }
    }
    catch (e) {
      if (e.response && e.response.data)
        yield cbError(e.response.data.ErrorMessage);
      else
        yield cbError();
    }
  })
}
//#endregion

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    // fork(loginSuccess),
    // fork(loginError),
    fork(logout),
    fork(forgotPassword),
    fork(checkTokenResetPassword),
    fork(resetPassword),
  ]);
}

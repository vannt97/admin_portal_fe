import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { toastMessage } from '../../constants/Models';
import staticImageTrialService from '../../services/staticImage';
import actions from './actions';

//#region CRUD
export function* getStaticImageTrialPortal() {
  yield takeLatest(actions.GET_STATIC_IMAGE_TRIAL_PORTAL, function* ({ body }) {
    try {
      const response = yield call(staticImageTrialService.getStaticImageTrialPortal, body);
      if (response?.data) {
        yield put({
          type: actions.GET_STATIC_IMAGE_TRIAL_PORTAL_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* updateStaticImageTrial() {
  yield takeLatest(actions.UPDATE_STATIC_IMAGE_TRIAL, function* ({ body, cbSuccess, cbError }) {
    try {
      const response = yield call(staticImageTrialService.updateStaticImageTrial, body);
      if (response?.data) {
        cbSuccess(toastMessage.updateSuccess);
      }
    } catch (e) {
      cbError(toastMessage.updateError);
    }
  });
}

export function* getStaticImageTrial() {
  yield takeLatest(actions.GET_STATIC_IMAGE_TRIAL, function* ({ body }) {
    try {
      const response = yield call(staticImageTrialService.getStaticImageTrial, body);
      if (response?.data) {
        yield put({
          type: actions.GET_STATIC_IMAGE_TRIAL_PORTAL_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* switchSetupBanner() {
  yield takeLatest(actions.SWITCH_SETUP_BANNER, function* ({ cbSuccess, cbError }) {
    try {
      console.log('vao day');
      const response = yield call(staticImageTrialService.switchSetupBanner);
      if (response?.data) {
        cbSuccess();
      }
    } catch (e) {
      cbError();
    }
  });
}

// Partners
export function* getImgPartners() {
  yield takeLatest(actions.GET_IMG_PARTNERS, function* ({ body }) {
    try {
      const response = yield call(staticImageTrialService.getImgPartners, body);
      if (response?.data) {
        yield put({
          type: actions.GET_IMG_PARTNERS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* updateImgPartners() {
  yield takeLatest(actions.UPDATE_IMG_PARTNERS, function* ({ body, cbSuccess, cbError }) {
    try {
      const response = yield call(staticImageTrialService.updateImgPartners, body);
      if (response?.data) {
        cbSuccess(toastMessage.updateSuccess);
      }
    } catch (e) {
      cbError(toastMessage.updateError);
    }
  });
}

export function* getImgPartnersPortal() {
  yield takeLatest(actions.GET_IMG_PARTNERS_PORTAL, function* ({ body }) {
    try {
      const response = yield call(staticImageTrialService.getImgPartnersPortal, body);
      if (response?.data) {
        yield put({
          type: actions.GET_IMG_PARTNERS_PORTAL_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getStaticImageTrial),
    fork(getStaticImageTrialPortal),
    fork(updateStaticImageTrial),
    fork(getImgPartners),
    fork(getImgPartnersPortal),
    fork(updateImgPartners),
    fork(switchSetupBanner)
  ]);
}

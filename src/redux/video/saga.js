import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import videoService from '../../services/video';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getVideo() {
  yield takeLatest(actions.GET_VIDEO, function* ({ body }) {
    try {
      const response = yield call(videoService.getVideo, body);
      if (response?.data) {
        yield put({
          type: actions.GET_VIDEO_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* getVideoDetail() {
  yield takeLatest(actions.GET_VIDEO_DETAIL, function* ({ payload }) {
    try {
      const response = yield call(videoService.getVideoDetail, payload.id);
      if (response?.data) {
        yield put({
          type: actions.GET_VIDEO_DETAIL_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* exportVideo() {
  yield takeLatest(actions.EXPORT_VIDEO, function* ({ body, cbSuccess, cbError }) {
    try {
      const response = yield call(videoService.getVideo, body);
      if (response?.data) {
        yield put({
          type: actions.EXPORT_VIDEO_SUCCESS,
          payload: response.data,
        });
        cbSuccess(response?.data?.data);
      }
    } catch (e) {
      cbError(toastMessage.exportError);
    }
  });
}

export function* createVideo() {
  yield takeLatest(actions.CREATE_VIDEO, function* ({ body, cbSuccess, cbError }) {
    try {
      const response = yield call(videoService.createVideo, body);
      if (response?.data) {
        cbSuccess(toastMessage.addSuccess);
      }
    } catch (e) {
      cbError(toastMessage.addError);
    }
  });
}

export function* updateVideo() {
  yield takeLatest(actions.UPDATE_VIDEO, function* ({ id, body, cbSuccess, cbError }) {
    try {
      const response = yield call(videoService.updateVideo, id, body);
      if (response?.data) {
        cbSuccess(toastMessage.updateSuccess);
      }
    } catch (e) {
    }
  });
}

export function* deleteVideo() {
  yield takeLatest(actions.DELETE_VIDEO, function* ({ id, cbSuccess, cbError }) {
    try {
      const response = yield call(videoService.deleteVideo, id);
      if (response?.data) {
        cbSuccess(toastMessage.deleteSuccess);
      }
    } catch (e) {
      cbError(toastMessage.deleteError);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getVideo), fork(createVideo), fork(exportVideo), fork(deleteVideo), fork(updateVideo), fork(getVideoDetail)]);
}

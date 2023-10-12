import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { toastMessage } from '../../constants/Models';
import historyRotation from '../../services/historyRotation';

//#region CRUD
export function* getHistoryRotation() {
    yield takeLatest(actions.GET_HISTORY_ROTATION, function* ({ body }) {
        try {
            const response = yield call(historyRotation.getHistoryRotation, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_HISTORY_ROTATION_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}


export function* exportHistoryRotation() {
    yield takeLatest(actions.EXPORT_HISTORY_ROTATION, function* ({ body, cbSuccess, cbError }) {
        try {
            const response = yield call(historyRotation.getHistoryRotation, body);
            if (response?.data) {
                yield put({
                    type: actions.EXPORT_HISTORY_ROTATION_SUCCESS,
                    payload: response.data,
                });
                cbSuccess(response.data);
            }
        } catch (e) {
            cbError(toastMessage.exportError);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getHistoryRotation), fork(exportHistoryRotation)]);
}

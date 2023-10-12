import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import giftService from '../../services/gift';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getGift() {
    yield takeLatest(actions.GET_GIFT, function* ({ body }) {
        try {
            const response = yield call(giftService.getGift, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_GIFT_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* getGiftDetail() {
    yield takeLatest(actions.GET_GIFT_DETAIL, function* ({ payload }) {
        try {
            const response = yield call(giftService.getGiftDetail, payload.id);
            if (response?.data) {
                yield put({
                    type: actions.GET_GIFT_DETAIL_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* exportTreeSite() {
    yield takeLatest(actions.EXPORT_GIFT, function* ({ body, cbError }) {
        try {
            const response = yield call(giftService.getGift, body);
            if (response?.data) {
                yield put({
                    type: actions.EXPORT_GIFT_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) {
            cbError(toastMessage.exportError);
        }
    });
}

export function* createGift() {
    yield takeLatest(actions.CREATE_GIFT, function* ({ body, cbSuccess, cbError }) {
        try {
            const response = yield call(giftService.createGift, body);
            if (response?.data) {
                cbSuccess(toastMessage.addSuccess);
            }
        } catch (e) {
            cbError(toastMessage.addError);
        }
    });
}

export function* updateGift() {
    yield takeLatest(actions.UPDATE_GIFT, function* ({ id, body, cbSuccess, cbError }) {
        try {
            const response = yield call(giftService.updateGift, id, body);
            if (response?.data) {
                cbSuccess(toastMessage.updateSuccess);
            }
        } catch (e) {
            cbError(toastMessage.updateError);
        }
    });
}

export function* deleteGift() {
    yield takeLatest(actions.DELETE_GIFT, function* ({ id, cbSuccess, cbError }) {
        try {
            const response = yield call(giftService.deleteGift, id);
            if (response?.data) {
                cbSuccess(toastMessage.deleteSuccess);
            }
        } catch (e) {
            cbError(toastMessage.deleteError);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getGift), fork(createGift), fork(exportTreeSite), fork(deleteGift), fork(updateGift), fork(getGiftDetail)]);
}

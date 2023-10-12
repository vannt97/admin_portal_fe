import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as FAQsServices from '@iso/services/FAQs';


//#region PRODUCT TYPE
export function* getFAQs() {
    yield takeEvery(actions.GET_FAQs, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(FAQsServices.getFAQs, model);
            if (response.data.success === true) {
                var data = response.data.data.data;
                var totalItems = response.data.data.total;
                yield put({
                    type: actions.GET_FAQs_SUCCESS,
                    payload: { data, totalItems }
                })
            }
        } catch (e) {
            yield put({ type: actions.FAQ_LOADING_FALSE })
        }
    })
}
export function* deleteFAQ() {
    yield takeEvery(actions.DELETE_FAQ, function* ({ payload, cbSuccess, cbError }) {
        const { id } = payload;
        try {
            var response = yield call(FAQsServices.deleteFAQ, id);
            if (response.data.success === true) {
                yield cbSuccess();
            }
        } catch (e) {
            if (e.response && e.response.data)
                yield cbError(e.response.data.ErrorMessage);
            else
                yield cbError();
        }
    })
}
export function* getFAQDetail() {
    yield takeEvery(actions.GET_FAQ_DETAIL, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(FAQsServices.getFAQDetail, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_FAQ_DETAIL_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.FAQ_LOADING_FALSE })
        }
    })
}
export function* createFAQ() {
    yield takeEvery(actions.CREATE_FAQ, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(FAQsServices.createFAQ, model);
            if (response.data.success === true) {
                yield cbSuccess();
            }
        } catch (e) {
            if (e.response && e.response.data)
                yield cbError(e.response.data.ErrorMessage);
            else
                yield cbError();
        }
    })
}
export function* updateFAQ() {
    yield takeEvery(actions.UPDATE_FAQ, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(FAQsServices.updateFAQ, model);
            if (response.data.success === true) {
                yield cbSuccess();
            }
        } catch (e) {
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
        fork(getFAQs),
        fork(deleteFAQ),
        fork(getFAQDetail),
        fork(createFAQ),
        fork(updateFAQ),
    ])
}
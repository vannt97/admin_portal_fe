import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as configServices from '@iso/services/config';

//#region CRUD
export function* getConfigs() {
    yield takeEvery(actions.GET_CONFIGS, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(configServices.getConfigs, model);
            if (response.data.success === true) {
                var data = response.data.data.data;
                var totalItems = response.data.data.total;
                yield put({
                    type: actions.GET_CONFIGS_SUCCESS,
                    payload: { data, totalItems }
                })
            }
        } catch (e) {
            yield put({ type: actions.CONFIGS_LOADING_FALSE })
        }
    })
}
export function* getConfigDetail() {
    yield takeEvery(actions.GET_CONFIG_DETAIL, function* ({ payload }) {
        const { key } = payload;
        try {
            var response = yield call(configServices.getConfigDetail, key);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_CONFIG_DETAIL_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.CONFIGS_LOADING_FALSE })
        }
    })
}
export function* updateConfig() {
    yield takeEvery(actions.UPDATE_CONFIG, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(configServices.updateConfig, model);
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
        fork(getConfigs),
        fork(getConfigDetail),
        fork(updateConfig),
    ])
}
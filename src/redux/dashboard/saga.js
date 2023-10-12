import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as dashboardServices from '@iso/services/dashboard';

//#region DASHBOARD
export function* getStatistics() {
    yield takeLatest(actions.GET_STATISTICS, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(dashboardServices.getStatistics, model);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_STATISTICS_SUCCESS,
                    payload: { data }
                });
            }
        } catch (e) {
            yield put({
                type: actions.GET_STATISTICS_ERROR,
            });
        }
    });
}

export function* getDashboard() {
    yield takeLatest(actions.GET_DASHBOARD, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(dashboardServices.getDashboard, model);
            if (response.data) {
                var data = response.data;
                yield put({
                    type: actions.GET_DASHBOARD_SUCCESS,
                    payload: { data }
                });
            }
        } catch (e) {
            yield put({
                type: actions.GET_STATISTICS_ERROR,
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getStatistics),
        fork(getDashboard)
    ]);
}
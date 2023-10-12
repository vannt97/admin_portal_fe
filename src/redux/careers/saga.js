import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as careerServices from '@iso/services/career';

//#region CRUD
export function* getCareers() {
    yield takeEvery(actions.GET_CAREERS, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(careerServices.getCareers, model);
            if (response.data.success === true) {
                var data = response.data.data.data;
                var totalItems = response.data.data.total;
                yield put({
                    type: actions.GET_CAREERS_SUCCESS,
                    payload: { data, totalItems }
                })
            }
        } catch (e) {
            yield put({ type: actions.CAREER_LOADING_FALSE })
        }
    })
}
export function* createCareer() {
    yield takeEvery(actions.CREATE_CAREER, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(careerServices.createCareer, model);
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
export function* updateCareer() {
    yield takeEvery(actions.UPDATE_CAREER, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(careerServices.updateCareer, model);
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
export function* deleteCareer() {
    yield takeEvery(actions.DELETE_CAREER, function* ({ payload, cbSuccess, cbError }) {
        const { id } = payload;
        try {
            var response = yield call(careerServices.deleteCareer, id);
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
export function* getCareerDetail() {
    yield takeEvery(actions.GET_CAREER_DETAIL, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(careerServices.getCareerDetail, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_CAREER_DETAIL_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.CAREER_LOADING_FALSE })
        }
    })
}


export default function* rootSaga() {
    yield all([
        fork(getCareers),
        fork(createCareer),
        fork(updateCareer),
        fork(deleteCareer),
        fork(getCareerDetail),
    ])
}
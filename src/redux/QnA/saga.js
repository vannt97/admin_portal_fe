
import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as qnaService from '@iso/services/Qna';

export function* getQna() {
    yield takeEvery(actions.GET_QNA, function* ({ payload }) {
        const { model } = payload;
        try {
            const response = yield call(qnaService.getQna, model);
            if (response.data.success === true) {
                const { data } = response.data;
                yield put({
                    type: actions.GET_QNA_SUCCESS,
                    payload: { data },
                });
            }
        } catch (e) {
            yield put({ type: actions.LOADING_FALSE });
        }
    });
}

export function* getQnaDetail() {
    yield takeEvery(actions.GET_QNA_DETAIL, function* ({ payload }) {
        const { model } = payload;
        try {
            const response = yield call(qnaService.getQnaDetail, model);
            if (response.data.success === true) {
                const { data } = response.data;
                yield put({
                    type: actions.GET_QNA_DETAIL_SUCCESS,
                    payload: data,
                });
            }
        } catch (e) {
            yield put({ type: actions.LOADING_FALSE });
        }
    });
}

export function* deleteQna() {
    yield takeEvery(actions.DELETE_QNA, function* ({ payload, _success }) {
        const { model } = payload;
        try {
            yield call(qnaService.deleteQna, model);
            _success();
        } catch (e) {
            yield put({ type: actions.LOADING_FALSE });
        }

    });
}

export function* postQna() {
    yield takeEvery(actions.POST_QNA, function* ({ payload, _success }) {
        const { model } = payload;
        try {
            yield call(qnaService.postQna, { ...model });
            _success();
        } catch (e) {
            yield put({ type: actions.LOADING_FALSE });
        }

    });
}

export function* putQna() {
    yield takeEvery(actions.PUT_QNA, function* ({ payload, _success }) {
        const { model } = payload;
        try {
            yield call(qnaService.putQna, { ...model });
            _success();
        } catch (e) {
            yield put({ type: actions.LOADING_FALSE });
        }

    });
}

export default function* rootSaga() {
    yield all([
        fork(getQna),
        fork(getQnaDetail),
        fork(deleteQna),
        fork(postQna),
        fork(putQna)
    ]);
}
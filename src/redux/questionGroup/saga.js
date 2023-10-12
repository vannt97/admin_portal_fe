import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import questionGroupservice from '../../services/questionGroup';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getQuestionGroup() {
    yield takeLatest(actions.GET_QUESTION_GROUP, function* ({ body }) {
        try {
            const response = yield call(questionGroupservice.getQuestionGroup, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_QUESTION_GROUP_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}
export function* getQuestionGroupDetail() {
    yield takeLatest(actions.GET_QUESTION_GROUP_DETAIL, function* ({ payload }) {
        const { id } = payload;
        try {      
            const response = yield call(questionGroupservice.getQuestionGroupDetail, id);
            if (response?.data) {
                yield put({
                    type: actions.GET_QUESTION_GROUP_DETAIL_SUCCESS,
                    payload: response.data,
                });
                console.log(JSON.stringify(response.data))
            }
        } catch (e) { }
    });
}
export function* updateQuestionGroup() {
    yield takeLatest(actions.UPDATE_QUESTION_GROUP, function* ({ id, body, cbSuccess, cbError }) {
        try {
        
            console.log(body)
            const response = yield call(questionGroupservice.updateQuestionGroup, id, body);
            if (response?.data) {
                cbSuccess(toastMessage.updateSuccess);
                console.log('call api')
            }
        } catch (e) {
            cbError(toastMessage.updateError);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getQuestionGroup),fork(getQuestionGroupDetail),fork(updateQuestionGroup) ]);
}

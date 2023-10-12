import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import historiesQuizGameService from '../../services/historiesQuizGame';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getHistoriesQuizGame() {
    yield takeLatest(actions.GET_HISTORIES_QUIZGAME, function* ({ body }) {
        try {
            const response = yield call(historiesQuizGameService.getHistoriesQuizGame, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_HISTORIES_QUIZGAME_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* exportHistoriesQuizGame() {
    yield takeLatest(actions.EXPORT_HISTORIES_QUIZGAME, function* ({ body , cbSuccess, cbError}) {
        try {
            const response = yield call(historiesQuizGameService.getHistoriesQuizGame, body);
            if (response?.data) {
                yield put({
                    type: actions.EXPORT_HISTORIES_QUIZGAME_SUCCESS,
                    payload: response.data,
                });
                cbSuccess(response.data);
            }
        } catch (e) { cbError(toastMessage.exportError); }
    });
}

export default function* rootSaga() {
    yield all([fork(getHistoriesQuizGame), fork(exportHistoriesQuizGame)]);
}

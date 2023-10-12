import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import TreePGHistoryService from '../../services/treePGHistory';
import actions from './actions';

//#region CRUD
export function* getTreePGHistory() {
  yield takeLatest(actions.GET_TREE_PG_HISTORY, function* ({ body, cbSuccess }) {
    try {
      const response = yield call(TreePGHistoryService.getTreePGHistory, body);
      if (response?.data) {
        yield put({
          type: actions.GET_TREE_PG_HISTORY_SUCCESS,
          payload: response.data,
        });
      }
    } catch (e) { }
  });
}

export function* exportTreePGHistory() {
  yield takeLatest(actions.EXPORT_TREE_PG_HISTORY, function* ({ body, cbSuccess }) {
    try {
      const response = yield call(TreePGHistoryService.getTreePGHistory, body);
      if (response?.data) {
        cbSuccess(response?.data)
      }
    } catch (e) { }
  });
}

export default function* rootSaga() {
  yield all([fork(getTreePGHistory), fork(exportTreePGHistory)]);
}

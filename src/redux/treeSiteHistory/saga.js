import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import treeSiteHistoryService from '../../services/treeSiteHistory';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getTreeSiteHistory() {
	yield takeLatest(actions.GET_TREE_SITE_HISTORY, function* ({ payload }) {
		try {
			const response = yield call(treeSiteHistoryService.getTreeSiteHistory, payload);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_HISTORY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {}
	});
}

export function* exportTreeSiteHistory() {
	yield takeLatest(actions.EXPORT_TREE_SITE_HISTORY, function* ({ body, cbError }) {
		try {
			const response = yield call(treeSiteHistoryService.getTreeSiteHistory, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_SITE_HISTORY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* getTreeSiteHistoryDetail() {
	yield takeLatest(actions.GET_TREE_SITE_HISTORY_DETAIL, function* ({ payload, cbError }) {
		const { id } = payload;
		try {
			const response = yield call(treeSiteHistoryService.getTreeSiteHistoryDetail, id);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_HISTORY_DETAIL_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError();
		}
	});
}

export function* createTreeSiteHistory() {
	yield takeLatest(actions.CREATE_TREE_SITE_HISTORY, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteHistoryService.createTreeSiteHistory, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTreeSiteHistory() {
	yield takeLatest(actions.UPDATE_TREE_SITE_HISTORY, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteHistoryService.updateTreeSiteHistory, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTreeSiteHistory() {
	yield takeLatest(actions.DELETE_TREE_SITE_HISTORY, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteHistoryService.deleteTreeSiteHistory, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(getTreeSiteHistory),
		fork(createTreeSiteHistory),
		fork(deleteTreeSiteHistory),
		fork(updateTreeSiteHistory),
		fork(getTreeSiteHistoryDetail),
		fork(exportTreeSiteHistory),
	]);
}

import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import treeSiteService from '../../services/treeSite';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getTreeSite() {
	yield takeLatest(actions.GET_TREE_SITE, function* ({ body }) {
		try {
			const response = yield call(treeSiteService.getTreeSite, body);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* getTreeSiteDetail() {
	yield takeLatest(actions.GET_TREE_SITE_DETAIL, function* ({ payload }) {
		try {
			const response = yield call(treeSiteService.getTreeSiteDetail, payload.id);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_DETAIL_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* exportTreeSite() {
	yield takeLatest(actions.EXPORT_TREE_SITE, function* ({ body, cbError }) {
		try {
			const response = yield call(treeSiteService.getTreeSite, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_SITE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* createTreeSite() {
	yield takeLatest(actions.CREATE_TREE_SITE, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteService.createTreeSite, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTreeSite() {
	yield takeLatest(actions.UPDATE_TREE_SITE, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteService.updateTreeSite, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTreeSite() {
	yield takeLatest(actions.DELETE_TREE_SITE, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteService.deleteTreeSite, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(getTreeSite), fork(createTreeSite), fork(exportTreeSite), fork(deleteTreeSite), fork(updateTreeSite), fork(getTreeSiteDetail)]);
}

import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import treesService from '../../services/treeManagement';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getTree() {
	yield takeLatest(actions.GET_TREE, function* ({ payload }) {
		const { model } = payload;
		try {
			const response = yield call(treesService.getManagementsTree, model);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* exportTree() {
	yield takeLatest(actions.EXPORT_TREE, function* ({ body, cbError }) {
		try {
			const response = yield call(treesService.getManagementsTree, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* getSiteAndType() {
	yield takeLatest(actions.GET_SITE_AND_TYPE, function* ({ payload }) {
		const { model } = payload;
		try {
			const response = yield call(treesService.getSiteAndType, model);
			if (response?.data) {
				yield put({
					type: actions.GET_SITE_AND_TYPE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* getTreeDetail() {
	yield takeLatest(actions.GET_TREE_DETAIL, function* ({ id, cbError }) {
		try {
			const response = yield call(treesService.getTreeDetail, id);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_DETAIL_SUCCESS,
					payload: response.data.data,
				});
			}
		} catch (e) {
			cbError();
		}
	});
}

export function* createTree() {
	yield takeLatest(actions.CREATE_TREE, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treesService.createTree, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTree() {
	yield takeLatest(actions.UPDATE_TREE, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treesService.updateTree, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTree() {
	yield takeLatest(actions.DELETE_TREE, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treesService.deleteTree, id);
			if (response?.data) {
				cbSuccess();
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* getTreeShare() {
	yield takeLatest(actions.EXPORT_TREE_SHARE, function* ({ params, cbSuccess, cbError }) {
		try {
			const response = yield call(treesService.getTreeShare, params);
			if (response?.data) {
				cbSuccess(response?.data);
			}
		} catch (e) {
			cbError();
		}
	});
}

export function* getTreeShareAll() {
	yield takeLatest(actions.EXPORT_TREE_SHARE_ALL, function* ({ params, cbSuccess, cbError }) {
		try {
			const response = yield call(treesService.getTreeShareAll, params);
			if (response?.data) {
				cbSuccess(response?.data);
			}
		} catch (e) {
			cbError();
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(getTree),
		fork(createTree),
		fork(deleteTree),
		fork(exportTree),
		fork(updateTree),
		fork(getSiteAndType),
		fork(getTreeDetail),
		fork(getTreeShare),
		fork(getTreeShareAll)
	]);
}

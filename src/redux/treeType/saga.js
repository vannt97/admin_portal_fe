import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import treeTypeService from '../../services/treeType';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getTreeType() {
	yield takeLatest(actions.GET_TREE_TYPE, function* ({ body }) {
		try {
			const response = yield call(treeTypeService.getTreeType, body);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_TYPE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {}
	});
}

export function* exportTreeType() {
	yield takeLatest(actions.EXPORT_TREE_TYPE, function* ({ body, cbError }) {
		try {
			const response = yield call(treeTypeService.getTreeType, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_TYPE_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* createTreeType() {
	yield takeLatest(actions.CREATE_TREE_TYPE, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeTypeService.createTreeType, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTreeType() {
	yield takeLatest(actions.UPDATE_TREE_TYPE, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeTypeService.updateTreeType, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTreeType() {
	yield takeLatest(actions.DELETE_TREE_TYPE, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treeTypeService.deleteTreeType, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(getTreeType), fork(createTreeType), fork(exportTreeType), fork(deleteTreeType), fork(updateTreeType)]);
}

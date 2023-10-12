import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import pgService from '../../services/pg';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getPG() {
	yield takeLatest(actions.GET_PG, function* ({ body }) {
		try {
			const response = yield call(pgService.getPG, body);
			if (response?.data) {
				yield put({
					type: actions.GET_PG_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* getPGDetail() {
	yield takeLatest(actions.GET_PG_DETAIL, function* ({ payload }) {
		try {
			const response = yield call(pgService.getPGDetail, payload.id);
			if (response?.data) {
				yield put({
					type: actions.GET_PG_DETAIL_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* exportPG() {
	yield takeLatest(actions.EXPORT_PG, function* ({ body, exportType, cbSuccess, cbError }) {
		try {
			const response = yield call(pgService.getPG, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_PG_SUCCESS,
					payload: response.data,
				});
				cbSuccess({
					data: response.data,
					type: exportType.type
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* createPG() {
	yield takeLatest(actions.CREATE_PG, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(pgService.createPG, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* importPG() {
	yield takeLatest(actions.IMPORT_PG, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(pgService.importPG, body);
			if (response?.data) {
				cbSuccess(toastMessage.importSuccess);
			}
		} catch (e) {
			cbError(toastMessage.importError);
		}
	});
}

export function* updatePG() {
	yield takeLatest(actions.UPDATE_PG, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(pgService.updatePG, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deletePG() {
	yield takeLatest(actions.DELETE_PG, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(pgService.deletePG, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(getPG), fork(createPG), fork(exportPG), fork(deletePG), fork(updatePG), fork(getPGDetail), fork(importPG)]);
}

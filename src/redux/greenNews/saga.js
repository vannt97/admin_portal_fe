import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { toastMessage } from '../../constants/Models';
import greenNewsService from '../../services/greenNews';

//#region CRUD
export function* getGreenNews() {
	yield takeLatest(actions.GET_GREEN_NEWS, function* ({ body }) {
		try {
			const response = yield call(greenNewsService.getGreenNews, body);
			if (response?.data) {
				yield put({
					type: actions.GET_GREEN_NEWS_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {}
	});
}

export function* createGreenNews() {
	yield takeLatest(actions.CREATE_GREEN_NEWS, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(greenNewsService.createGreenNews, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateGreenNews() {
	yield takeLatest(actions.UPDATE_GREEN_NEWS, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(greenNewsService.updateGreenNews, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteGreenNews() {
	yield takeLatest(actions.DELETE_GREEN_NEWS, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(greenNewsService.deleteGreenNews, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export function* exportGreenNews() {
	yield takeLatest(actions.EXPORT_GREEN_NEWS, function* ({ body, cbError }) {
		try {
			const response = yield call(greenNewsService.getGreenNews, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_GREEN_NEWS_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(getGreenNews), fork(createGreenNews), fork(deleteGreenNews), fork(updateGreenNews), fork(exportGreenNews)]);
}

import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { toastMessage } from '../../constants/Models';
import treeJourneyService from '../../services/treeJourney';

//#region CRUD
export function* getTreeJourney() {
	yield takeLatest(actions.GET_TREE_JOURNEY, function* ({ body }) {
		try {
			const response = yield call(treeJourneyService.getTreeJourney, body);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_JOURNEY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) { }
	});
}

export function* exportTreeJourney() {
	yield takeLatest(actions.EXPORT_TREE_JOURNEY, function* ({ body, cbError }) {
		try {
			const response = yield call(treeJourneyService.getTreeJourney, body);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_JOURNEY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* createTreeJourney() {
	yield takeLatest(actions.CREATE_TREE_JOURNEY, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeJourneyService.createTreeJourney, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTreeJourney() {
	yield takeLatest(actions.UPDATE_TREE_JOURNEY, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeJourneyService.updateTreeJourney, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTreeJourney() {
	yield takeLatest(actions.DELETE_TREE_JOURNEY, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treeJourneyService.deleteTreeJourney, id);
			if (response?.data) {
				cbSuccess(toastMessage.deleteSuccess);
			}
		} catch (e) {
			cbError(toastMessage.deleteError);
		}
	});
}

export function* updateTreeHistory() {
	yield takeLatest(actions.UPDATE_TREE_HISTORY, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeJourneyService.updateTreeHistory, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(getTreeJourney), fork(createTreeJourney), fork(exportTreeJourney), fork(deleteTreeJourney), fork(updateTreeJourney), fork(updateTreeHistory)]);
}

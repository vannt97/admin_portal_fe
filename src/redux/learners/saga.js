import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as learnerServices from '@iso/services/learner';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';

//#region CRUD
export function* getLearners() {
	yield takeLatest(actions.GET_LEARNERS, function* ({ payload }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.getLearners, model);
			if (response.data.success === true) {
				var data = response.data.data.data;
				var totalItems = response.data.data.total;
				yield put({
					type: actions.GET_LEARNERS_SUCCESS,
					payload: { data, totalItems },
				});
			}
		} catch (e) {
			yield put({
				type: actions.GET_LEARNERS_ERROR,
			});
		}
	});
}

export function* getLearnerDetail() {
	yield takeLatest(actions.GET_LEARNER_DETAIL, function* ({ payload }) {
		const { id } = payload;
		try {
			var response = yield call(learnerServices.getLearnerDetail, id);
			if (response.data.success === true) {
				var data = response.data.data;
				yield put({
					type: actions.GET_LEARNER_DETAIL_SUCCESS,
					payload: { data },
				});
			}
		} catch (e) {
			yield put({
				type: actions.GET_LEARNER_DETAIL_ERROR,
			});
		}
	});
}

export function* createLearner() {
	yield takeLatest(actions.CREATE_LEARNER, function* ({ payload, cbSuccess, cbError }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.createLearner, model);
			if (response.data.success === true) {
				yield cbSuccess();
			}
		} catch (e) {
			if (e.response && e.response.data) yield cbError(e.response.data.ErrorMessage);
			else yield cbError();
		}
	});
}
export function* updateLearner() {
	yield takeLatest(actions.UPDATE_LEARNER, function* ({ payload, cbSuccess, cbError }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.updateLearner, model);
			if (response.data.success === true) {
				yield cbSuccess();
			}
		} catch (e) {
			if (e.response && e.response.data) yield cbError(e.response.data.ErrorMessage);
			else yield cbError();
		}
	});
}
export function* deleteLearner() {
	yield takeLatest(actions.DELETE_LEARNER, function* ({ payload, cbSuccess, cbError }) {
		const { id } = payload;
		try {
			var response = yield call(learnerServices.deleteLearner, id);
			if (response.data.success === true) {
				yield cbSuccess();
			}
		} catch (e) {
			if (e.response && e.response.data) yield cbError(e.response.data.ErrorMessage);
			else yield cbError();
		}
	});
}
export function* createSubcription() {
	yield takeLatest(actions.CREATE_SUBCRIPTION, function* ({ payload, cbSuccess, cbError }) {
		const { model, learnerId } = payload;
		try {
			var response = yield call(learnerServices.createSubcription, model, learnerId);
			if (response.data.success === true) {
				yield cbSuccess();
			}
		} catch (e) {
			if (e.response && e.response.data) yield cbError(e.response.data.ErrorMessage);
			else yield cbError();
		}
	});
}
export function* getSubcriptions() {
	yield takeLatest(actions.GET_SUBCRIPTIONS, function* ({ payload }) {
		const { model, learnerId } = payload;
		try {
			var response = yield call(learnerServices.getSubcriptions, model, learnerId);
			if (response.data.success === true) {
				var { data } = response.data.data;
				var totalItems = response.data.data.total;
				yield put({
					type: actions.GET_SUBCRIPTIONS_SUCCESS,
					payload: { data, totalItems },
				});
			}
		} catch (e) {
			yield put({ type: actions.LEARNER_LOADING_FALSE });
		}
	});
}
export function* updateSubcription() {
	yield takeLatest(actions.UPDATE_SUBCRIPTION, function* ({ payload, cbSuccess, cbError }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.updateSubcription, model);
			if (response.data.success === true) {
				yield cbSuccess();
			}
		} catch (e) {
			if (e.response && e.response.data) yield cbError(e.response.data.ErrorMessage);
			else yield cbError();
		}
	});
}
export function* getSubcriptionDetail() {
	yield takeLatest(actions.GET_SUBCRIPTION_DETAIL, function* ({ payload }) {
		const { id } = payload;
		try {
			var response = yield call(learnerServices.getSubcriptionDetail, id);
			if (response.data.success === true) {
				var data = response.data.data;
				yield put({
					type: actions.GET_SUBCRIPTION_DETAIL_SUCCESS,
					payload: { data },
				});
			}
		} catch (e) {
			yield put({
				type: actions.GET_SUBCRIPTION_DETAIL_ERROR,
			});
		}
	});
}
export function* getLearnVocakeys() {
	yield takeLatest(actions.GET_LEARNVOCAKEYS, function* ({ payload }) {
		const { model, learnerId } = payload;
		try {
			var response = yield call(learnerServices.getLearnVocakeys, model, learnerId);
			if (response.data.success === true) {
				var data = response.data.data.data;
				var totalLearnVocakeys = response.data.data.total;
				yield put({
					type: actions.GET_LEARNVOCAKEYS_SUCCESS,
					payload: { data, totalLearnVocakeys },
				});
			}
		} catch (e) {
			yield put({ type: actions.LEARNER_LOADING_FALSE });
		}
	});
}
function* exportSuccess(data, learnerData) {
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${learnerData.name}(${learnerData.date}).xlsx`);
	document.body.appendChild(link);
	link.click();
}

export function* exportLeaner() {
	yield takeLatest(actions.EXPORT_LEARNER, function* ({ payload }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.exportLeaner, { id: model.id });
			if (response.data) {
				yield exportSuccess(response.data, model);
			}
			if (response) {
				yield put({
					type: actions.EXPORT_LEARNER_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			yield put({ type: actions.LEARNER_LOADING_FALSE });
		}
	});
}

export function* exportAllLeaner() {
	yield takeLatest(actions.EXPORT_ALL_LEARNER, function* ({ payload }) {
		const { model, learnerId } = payload;
		try {
			var response = yield call(learnerServices.exportAllLeaner, model, learnerId);
			if (response.data?.result?.success === true) {
				yield put({
					type: actions.EXPORT_ALL_LEARNER_SUCCESS,
					payload: response.data?.result,
				});
			}
		} catch (e) {
			yield put({ type: actions.LEARNER_LOADING_FALSE });
		}
	});
}

export function* getLearnerMockTest() {
	yield takeLatest(actions.GET_LEARNER_MOCK_TEST, function* ({ payload }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.getLearnerMockTest, model);
			if (response.data.success === true) {
				var data = response.data.data;
				yield put({
					type: actions.GET_LEARNER_MOCK_TEST_SUCCESS,
					payload: { data },
				});
			}
		} catch (e) {
			yield put({
				type: actions.GET_LEARNER_DETAIL_ERROR,
			});
		}
	});
}

export function* getLearnerMockTestDetail() {
	yield takeLatest(actions.GET_LEARNER_MOCK_TEST_DETAIL, function* ({ payload }) {
		const { model } = payload;
		try {
			var response = yield call(learnerServices.getLearnerMockTestDetail, model);
			if (response.data.success === true) {
				var data = response.data.data;
				yield put({
					type: actions.GET_LEARNER_MOCK_TEST_DETAIL_SUCCESS,
					payload: { data },
				});
			}
		} catch (e) {
			yield put({
				type: actions.GET_LEARNER_DETAIL_ERROR,
			});
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(getLearners),
		fork(createLearner),
		fork(updateLearner),
		fork(deleteLearner),
		fork(getLearnerDetail),
		fork(createSubcription),
		fork(getSubcriptions),
		fork(updateSubcription),
		fork(getSubcriptionDetail),
		fork(getLearnVocakeys),
		fork(exportLeaner),
		fork(exportAllLeaner),
		fork(getLearnerMockTest),
		fork(getLearnerMockTestDetail),
	]);
}

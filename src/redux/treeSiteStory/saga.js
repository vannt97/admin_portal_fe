import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import treeSiteStoryService from '../../services/treeSiteStory';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getTreeSiteStory() {
	yield takeLatest(actions.GET_TREE_SITE_STORY, function* ({ payload }) {
		try {
			const response = yield call(treeSiteStoryService.getTreeSiteStory, payload);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_STORY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {}
	});
}

export function* exportTreeSiteStory() {
	yield takeLatest(actions.EXPORT_TREE_SITE_STORY, function* ({ id, cbError }) {
		try {
			const response = yield call(treeSiteStoryService.getTreeSiteStory, id);
			if (response?.data) {
				yield put({
					type: actions.EXPORT_TREE_SITE_STORY_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError(toastMessage.exportError);
		}
	});
}

export function* getTreeSiteStoryDetail() {
	yield takeLatest(actions.GET_TREE_SITE_STORY_DETAIL, function* ({ payload, cbError }) {
		const { id } = payload;
		try {
			const response = yield call(treeSiteStoryService.getTreeSiteStoryDetail, id);
			if (response?.data) {
				yield put({
					type: actions.GET_TREE_SITE_STORY_DETAIL_SUCCESS,
					payload: response.data,
				});
			}
		} catch (e) {
			cbError();
		}
	});
}

export function* createTreeSiteStory() {
	yield takeLatest(actions.CREATE_TREE_SITE_STORY, function* ({ body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteStoryService.createTreeSiteStory, body);
			if (response?.data) {
				cbSuccess(toastMessage.addSuccess);
			}
		} catch (e) {
			cbError(toastMessage.addError);
		}
	});
}

export function* updateTreeSiteStory() {
	yield takeLatest(actions.UPDATE_TREE_SITE_STORY, function* ({ id, body, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteStoryService.updateTreeSiteStory, id, body);
			if (response?.data) {
				cbSuccess(toastMessage.updateSuccess);
			}
		} catch (e) {
			cbError(toastMessage.updateError);
		}
	});
}

export function* deleteTreeSiteStory() {
	yield takeLatest(actions.DELETE_TREE_SITE_STORY, function* ({ id, cbSuccess, cbError }) {
		try {
			const response = yield call(treeSiteStoryService.deleteTreeSiteStory, id);
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
		fork(getTreeSiteStory),
		fork(createTreeSiteStory),
		fork(deleteTreeSiteStory),
		fork(updateTreeSiteStory),
		fork(getTreeSiteStoryDetail),
		fork(exportTreeSiteStory),
	]);
}

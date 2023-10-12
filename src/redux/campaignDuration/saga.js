import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import campaignService from '../../services/campaignDuration';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getCampaignDuration() {
    yield takeLatest(actions.GET_CAMPAIGN_DURATION, function* ({ body }) {
        try {
            const response = yield call(campaignService.getCampaignDuration, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_CAMPAIGN_DURATION_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* getCampaignDurationDetail() {
    yield takeLatest(actions.GET_CAMPAIGN_DURATION_DETAIL, function* ({ payload }) {
        try {
            const response = yield call(campaignService.getCampaignDurationDetail, payload.id);
            if (response?.data) {
                yield put({
                    type: actions.GET_CAMPAIGN_DURATION_DETAIL_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* exportCampaign() {
    yield takeLatest(actions.EXPORT_CAMPAIGN_DURATION, function* ({ body, cbError }) {
        try {
            const response = yield call(campaignService.getCampaignDuration, body);
            if (response?.data) {
                yield put({
                    type: actions.EXPORT_CAMPAIGN_DURATION_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) {
            cbError(toastMessage.exportError);
        }
    });
}

export function* createCampaignDuration() {
    yield takeLatest(actions.CREATE_CAMPAIGN_DURATION, function* ({ id, body, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.createCampaignDuration, id, body);
            if (response?.data) {
                cbSuccess(toastMessage.addSuccess);
            }
        } catch (e) {
            cbError(toastMessage.addError);
        }
    });
}

export function* updateCampaignDuration() {
    yield takeLatest(actions.UPDATE_CAMPAIGN_DURATION, function* ({ id, body, list, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.updateCampaignDuration, id, body);
            const responseList = yield call(campaignService.createCampaignDurationGift, list);
            if (response?.data) {
                cbSuccess(toastMessage.updateSuccess);
            }
        } catch (e) {
            cbError(toastMessage.updateError);
        }
    });
}

export function* deleteCampaignDuration() {
    yield takeLatest(actions.DELETE_CAMPAIGN_DURATION, function* ({ id, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.deleteCampaignDuration, id);
            if (response?.data) {
                cbSuccess(toastMessage.deleteSuccess);
            }
        } catch (e) {
            cbError(toastMessage.deleteError);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getCampaignDuration), fork(createCampaignDuration), fork(exportCampaign), fork(deleteCampaignDuration), fork(updateCampaignDuration), fork(getCampaignDurationDetail)]);
}

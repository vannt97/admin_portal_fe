import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import campaignService from '../../services/campaign';
import { toastMessage } from '../../constants/Models';

//#region CRUD
export function* getCampaign() {
    yield takeLatest(actions.GET_CAMPAIGN, function* ({ body }) {
        try {
            const response = yield call(campaignService.getCampaign, body);
            if (response?.data) {
                yield put({
                    type: actions.GET_CAMPAIGN_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* getCampaignDetail() {
    yield takeLatest(actions.GET_CAMPAIGN_DETAIL, function* ({ payload }) {
        try {
            const response = yield call(campaignService.getCampaignDetail, payload.id);
            if (response?.data) {
                yield put({
                    type: actions.GET_CAMPAIGN_DETAIL_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) { }
    });
}

export function* exportCampaign() {
    yield takeLatest(actions.EXPORT_CAMPAIGN, function* ({ body, cbError }) {
        try {
            const response = yield call(campaignService.getCampaign, body);
            if (response?.data) {
                yield put({
                    type: actions.EXPORT_CAMPAIGN_SUCCESS,
                    payload: response.data,
                });
            }
        } catch (e) {
            cbError(toastMessage.exportError);
        }
    });
}

export function* createCampaign() {
    yield takeLatest(actions.CREATE_CAMPAIGN, function* ({ body, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.createCampaign, body);
            if (response?.data) {
                cbSuccess(toastMessage.addSuccess);
            }
        } catch (e) {
            cbError(toastMessage.addError);
        }
    });
}

export function* updateCampaign() {
    yield takeLatest(actions.UPDATE_CAMPAIGN, function* ({ id, body, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.updateCampaign, id, body);
            if (response?.data) {
                cbSuccess(toastMessage.updateSuccess);
            }
        } catch (e) {
            cbError(toastMessage.updateError);
        }
    });
}

export function* deleteCampaign() {
    yield takeLatest(actions.DELETE_CAMPAIGN, function* ({ id, cbSuccess, cbError }) {
        try {
            const response = yield call(campaignService.deleteCampaign, id);
            if (response?.data) {
                cbSuccess(toastMessage.deleteSuccess);
            }
        } catch (e) {
            cbError(toastMessage.deleteError);
        }
    });
}

export default function* rootSaga() {
    yield all([fork(getCampaign), fork(createCampaign), fork(exportCampaign), fork(deleteCampaign), fork(updateCampaign), fork(getCampaignDetail)]);
}

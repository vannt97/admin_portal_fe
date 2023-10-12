import actions from './actions';

const initState = {
    campaignDuration: [],
    campaignDurationDetail: {},
    dataExportCampaignDuration: [],
    loading: false,
};

export default function campaignDurationReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_CAMPAIGN_DURATION_SUCCESS:
            return { ...state, loading: false, campaignDuration: action.payload };
        case actions.GET_CAMPAIGN_DURATION_DETAIL_SUCCESS:
            return { ...state, loading: false, campaignDurationDetail: action.payload?.data };
        case actions.EXPORT_GWIFT_SUCCESS:
            return { ...state, loading: false, dataExportCampaignDuration: action.payload };
        default:
            return state;
    }
}

import actions from './actions';

const initState = {
    campaign: [],
    campaignDetail: {},
    dataExportCampaign: [],
    loading: false,
};

export default function campaignReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_CAMPAIGN_SUCCESS:
            return { ...state, loading: false, campaign: action.payload };
        case actions.GET_CAMPAIGN_DETAIL_SUCCESS:
            return { ...state, loading: false, campaignDetail: action.payload?.data };
        case actions.EXPORT_GIFT_SUCCESS:
            return { ...state, loading: false, dataExportCampaign: action.payload };
        default:
            return state;
    }
}

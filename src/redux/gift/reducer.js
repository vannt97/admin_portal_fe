import actions from './actions';

const initState = {
    gift: [],
    giftDetail: {},
    dataExportGift: [],
    loading: false,
};

export default function treeSiteReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_GIFT_SUCCESS:
            return { ...state, loading: false, gift: action.payload };
        case actions.GET_GIFT_DETAIL_SUCCESS:
            return { ...state, loading: false, giftDetail: action.payload?.data };
        case actions.EXPORT_GIFT_SUCCESS:
            return { ...state, loading: false, dataExportGift: action.payload };
        default:
            return state;
    }
}

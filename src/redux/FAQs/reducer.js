import actions from './actions';

const initState = {
    FAQs: [],
    FAQDetail: {},
    loading: false,
    totalItems: 0
};

export default function FAQReducer(state = initState, action) {
    switch (action.type) {

        //#region GET LIST
        case actions.GET_FAQs:
            return { ...state, loading: true, totalItems: 0 };
        case actions.GET_FAQs_SUCCESS: {
            let { data, totalItems } = action.payload;
            let res = data ? data : [];
            return { ...state, FAQs: res, totalItems: totalItems, loading: false };
        }
        //#endregion

        //#region DETAIL
        case actions.GET_FAQ_DETAIL:
            return { ...state, loading: true };
        case actions.GET_FAQ_DETAIL_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, FAQDetail: res, loading: false };
        }
        //#endregion

        case actions.FAQ_LOADING_FALSE:
            return { ...state, loading: false };

        default:
            return state;

    }
}

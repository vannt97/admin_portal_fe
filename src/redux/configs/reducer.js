import actions from './actions';

const initState = {
    configs: [],
    configDetail: {},
    loading: false,
    totalItems: 0,
};

export default function configReducer(state = initState, action) {
    switch (action.type) {

        //#region CRUD
        case actions.GET_CONFIGS:
            return { ...state, loading: true };
        case actions.GET_CONFIGS_SUCCESS: {
            let { data, totalItems } = action.payload;
            let res = data ? data : [];
            return { ...state, configs: res, totalItems: totalItems, loading: false };
        }

        case actions.GET_CONFIG_DETAIL:
            return { ...state, loading: true };
        case actions.GET_CONFIG_DETAIL_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, configDetail: res, loading: false };
        }
        //#endregion

        case actions.CONFIGS_LOADING_FALSE:
            return { ...state, loading: false };

        default:
            return state;

    }
}

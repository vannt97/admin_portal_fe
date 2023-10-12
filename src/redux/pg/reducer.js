import actions from './actions';

const initState = {
    dataPG: [],
    pgDetail: {},
    dataExportPG: [],
    loading: false,
};

export default function pgReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_PG_SUCCESS:
            return { ...state, loading: false, dataPG: action.payload };
        case actions.GET_PG_DETAIL_SUCCESS:
            return { ...state, loading: false, pgDetail: action.payload?.data };
        case actions.EXPORT_PG_SUCCESS:
            return { ...state, loading: false, dataExportPG: action.payload };
        default:
            return state;
    }
}

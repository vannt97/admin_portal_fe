import actions from './actions';

const initState = {
    historyRotation: [],
    exportHistoryRotationData: [],
    loading: false,
};

export default function historyRotationReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_HISTORY_ROTATION_SUCCESS:
            return { ...state, loading: false, historyRotation: action.payload };
        case actions.EXPORT_HISTORY_ROTATION_SUCCESS:
            return { ...state, exportHistoryRotationData: action.payload };
        default:
            return state;
    }
}

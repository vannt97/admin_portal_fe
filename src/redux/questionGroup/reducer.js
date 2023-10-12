import actions from './actions';

const initState = {
    questionGroup: [],
    loading: false,
};

export default function questionGroupReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_QUESTION_GROUP_SUCCESS:
            return { ...state, loading: false, questionGroup: action.payload };
        case actions.GET_QUESTION_GROUP_DETAIL_SUCCESS:
            return { ...state, loading: false, questionGroupDetail: action.payload?.data };
        default:
            return state;
    }
}

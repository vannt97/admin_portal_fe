import actions from './actions';

const initState = {
    historiesQuizGame: [],
    dataExportHistoriesQuizGame: [],
    loading: false,
};

export default function historiesQuizGameReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_HISTORIES_QUIZGAME_SUCCESS:
            return { ...state, loading: false, historiesQuizGame: action.payload };
        case actions.EXPORT_HISTORIES_QUIZGAME:
            return { ...state, loading: false, dataExportHistoriesQuizGame: action.payload };
        default:
            return state;
    }
}

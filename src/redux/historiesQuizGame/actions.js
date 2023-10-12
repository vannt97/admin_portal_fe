const actions = {
    GET_HISTORIES_QUIZGAME: 'GET_HISTORIES_QUIZGAME',
    GET_HISTORIES_QUIZGAME_SUCCESS: 'GET_HISTORIES_QUIZGAME_SUCCESS',
    GET_HISTORIES_QUIZGAME_ERROR: 'GET_HISTORIES_QUIZGAME_ERROR',
    
    EXPORT_HISTORIES_QUIZGAME: 'EXPORT_HISTORIES_QUIZGAME',
    EXPORT_HISTORIES_QUIZGAME_SUCCESS: 'EXPORT_HISTORIES_QUIZGAME_SUCCESS',
    //#region CRUD
    getHistoriesQuizGame: (body) => ({
        type: actions.GET_HISTORIES_QUIZGAME,
        body,
    }),
    
    exportHistoriesQuizGame: (body,cbSuccess, cbError) => ({
        type: actions.EXPORT_HISTORIES_QUIZGAME,
        body,
        cbSuccess,
        cbError
    }),

};

export default actions;

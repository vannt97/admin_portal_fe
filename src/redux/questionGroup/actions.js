const actions = {
    GET_QUESTION_GROUP: 'GET_QUESTION_GROUP',
    GET_QUESTION_GROUP_SUCCESS: 'GET_QUESTION_GROUP_SUCCESS',
    GET_QUESTION_GROUP_ERROR: 'GET_QUESTION_GROUP_ERROR',

    GET_QUESTION_GROUP_DETAIL: 'GET_QUESTION_GROUP_DETAIL',
    GET_QUESTION_GROUP_DETAIL_SUCCESS: 'GET_QUESTION_GROUP_DETAIL_SUCCESS',
    GGET_QUESTION_GROUP_DETAIL_ERROR: 'GGET_QUESTION_GROUP_DETAIL_ERROR',

    EXPORT_CAMPAIGN: 'EXPORT_CAMPAIGN',
    EXPORT_CAMPAIGN_SUCCESS: 'EXPORT_CAMPAIGN_SUCCESS',

    CREATE_QUESTION_GROUP: 'CREATE_QUESTION_GROUP',
    UPDATE_QUESTION_GROUP: 'UPDATE_QUESTION_GROUP',
    DELETE_QUESTION_GROUP: 'DELETE_QUESTION_GROUP',

    //#region CRUD

    getQuestionGroup: (body) => ({
        type: actions.GET_QUESTION_GROUP,
        body,
    }),
    
    getQuestionGroupDetail: id => ({
        type: actions.GET_QUESTION_GROUP_DETAIL,
        payload: id 
    }),

    updateQuestionGroup: (id, body, cbSuccess, cbError) => ({
        type: actions.UPDATE_QUESTION_GROUP,
        id,
        body,
        cbSuccess,
        cbError,
    }),
};

export default actions;

const actions = {
    GET_QNA: 'GET_QNA',
    GET_QNA_SUCCESS: 'GET_QNA_SUCCESS',

    GET_QNA_DETAIL: 'GET_QNA_DETAIL',
    GET_QNA_DETAIL_SUCCESS: ' GET_QNA_DETAIL_SUCCESS',

    DELETE_QNA: 'DELETE_QNA',
    POST_QNA: 'POST_QNA',

    PUT_QNA: 'PUT_QNA',

    GET_ID_QUESTION_FOR_UPDATE: 'GET_ID_QUESTION_FOR_UPDATE',

    getQna: (model) => ({
        type: actions.GET_QNA,
        payload: { model },
    }),

    getQnaDetail: (model) => ({
        type: actions.GET_QNA_DETAIL,
        payload: { model },
    }),

    deleteQna: (model, _success) => ({
        type: actions.DELETE_QNA,
        payload: { model }, _success
    }),

    postQna: (model, _success) => ({
        type: actions.POST_QNA,
        payload: { model }, _success
    }),

    putQna: (model, _success) => ({
        type: actions.PUT_QNA,
        payload: { model }, _success
    }),
};

export default actions;

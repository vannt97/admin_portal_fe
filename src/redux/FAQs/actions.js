const actions = {

    //#region PRODUCT TYPE
    GET_FAQs: 'GET_FAQs',
    GET_FAQs_SUCCESS: 'GET_FAQs_SUCCESS',

    GET_FAQ_DETAIL: 'GET_FAQ_DETAIL',
    GET_FAQ_DETAIL_SUCCESS: 'GET_FAQ_DETAIL_SUCCESS',

    CREATE_FAQ: 'CREATE_FAQ',
    UPDATE_FAQ: 'UPDATE_FAQ',

    DELETE_FAQ: 'DELETE_FAQ',
    
    FAQ_LOADING_FALSE: 'FAQ_LOADING_FALSE',

    getFAQs: model => ({
        type: actions.GET_FAQs,
        payload: { model }
    }),
    deleteFAQ: (id, cbSuccess, cbError) => ({
        type: actions.DELETE_FAQ,
        payload: { id },
        cbSuccess, cbError
    }),
    getFAQDetail: id => ({
        type: actions.GET_FAQ_DETAIL,
        payload: { id }
    }),
    createFAQ: (model, cbSuccess, cbError) => ({
        type: actions.CREATE_FAQ,
        payload: { model },
        cbSuccess, cbError
    }),
    updateFAQ: (model, cbSuccess, cbError) => ({
        type: actions.UPDATE_FAQ,
        payload: { model },
        cbSuccess, cbError
    }),
    //#endregion
}

export default actions;
const actions = {
    GET_GIFT: 'GET_GIFT',
    GET_GIFT_SUCCESS: 'GET_GIFT_SUCCESS',
    GET_GIFT_ERROR: 'GET_GIFT_ERROR',

    GET_GIFT_DETAIL: 'GET_GIFT_DETAIL',
    GET_GIFT_DETAIL_SUCCESS: 'GET_GIFT_DETAIL_SUCCESS',
    GET_GIFT_DETAIL_ERROR: 'GET_GIFT_DETAIL_ERROR',

    EXPORT_GIFT: 'EXPORT_GIFT',
    EXPORT_GIFT_SUCCESS: 'EXPORT_GIFT_SUCCESS',

    CREATE_GIFT: 'CREATE_GIFT',
    UPDATE_GIFT: 'UPDATE_GIFT',
    DELETE_GIFT: 'DELETE_GIFT',

    //#region CRUD

    getGift: (body) => ({
        type: actions.GET_GIFT,
        body,
    }),

    exportGift: (body, cbError) => ({
        type: actions.EXPORT_GIFT,
        body,
        cbError,
    }),

    createGift: (body, cbSuccess, cbError) => ({
        type: actions.CREATE_GIFT,
        body,
        cbSuccess,
        cbError,
    }),
    updateGift: (id, body, cbSuccess, cbError) => ({
        type: actions.UPDATE_GIFT,
        id,
        body,
        cbSuccess,
        cbError,
    }),
    deleteGift: (id, cbSuccess, cbError) => ({
        type: actions.DELETE_GIFT,
        id,
        cbSuccess,
        cbError,
    }),
    getGiftDetail: (id) => ({
        type: actions.GET_GIFT_DETAIL,
        payload: { id },
    }),
};

export default actions;

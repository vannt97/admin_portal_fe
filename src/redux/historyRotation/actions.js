const actions = {
    GET_HISTORY_ROTATION: 'GET_HISTORY_ROTATION',
    GET_HISTORY_ROTATION_SUCCESS: 'GET_HISTORY_ROTATION_SUCCESS',
    GET_HISTORY_ROTATION_ERROR: 'GET_HISTORY_ROTATION_ERROR',

    EXPORT_HISTORY_ROTATION: 'EXPORT_HISTORY_ROTATION',
    EXPORT_HISTORY_ROTATION_SUCCESS: 'EXPORT_HISTORY_ROTATION_SUCCESS',

    //#region CRUD

    getHistoryRotation: (body) => ({
        type: actions.GET_HISTORY_ROTATION,
        body,
    }),

    exportHistoryRotation: (body, cbSuccess, cbError) => ({
        type: actions.EXPORT_HISTORY_ROTATION,
        body,
        cbSuccess,
        cbError,
    }),


};

export default actions;

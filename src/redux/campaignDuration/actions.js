const actions = {
    GET_CAMPAIGN_DURATION: 'GET_CAMPAIGN_DURATION',
    GET_CAMPAIGN_DURATION_SUCCESS: 'GET_CAMPAIGN_DURATION_SUCCESS',
    GET_CAMPAIGN_DURATION_ERROR: 'GET_CAMPAIGN_DURATION_ERROR',

    GET_CAMPAIGN_DURATION_DETAIL: 'GET_CAMPAIGN_DURATION_DETAIL',
    GET_CAMPAIGN_DURATION_DETAIL_SUCCESS: 'GET_CAMPAIGN_DURATION_DETAIL_SUCCESS',
    GET_CAMPAIGN_DURATION_DETAIL_ERROR: 'GET_CAMPAIGN_DURATION_DETAIL_ERROR',

    EXPORT_CAMPAIGN_DURATION: 'EXPORT_CAMPAIGN_DURATION',
    EXPORT_CAMPAIGN_DURATION_SUCCESS: 'EXPORT_CAMPAIGN_DURATION_SUCCESS',

    CREATE_CAMPAIGN_DURATION: 'CREATE_CAMPAIGN_DURATION',
    UPDATE_CAMPAIGN_DURATION: 'UPDATE_CAMPAIGN_DURATION',
    DELETE_CAMPAIGN_DURATION: 'DELETE_CAMPAIGN_DURATION',

    //#region CRUD

    getCampaignDuration: (body) => ({
        type: actions.GET_CAMPAIGN_DURATION,
        body,
    }),

    exportCampaignDuration: (body, cbError) => ({
        type: actions.EXPORT_CAMPAIGN_DURATION,
        body,
        cbError,
    }),

    createCampaignDuration: (id, body, cbSuccess, cbError) => ({
        type: actions.CREATE_CAMPAIGN_DURATION,
        id, body,
        cbSuccess,
        cbError,
    }),
    updateCampaignDuration: (id, body, list, cbSuccess, cbError) => ({
        type: actions.UPDATE_CAMPAIGN_DURATION,
        id,
        body, list,
        cbSuccess,
        cbError,
    }),
    deleteCampaignDuration: (id, cbSuccess, cbError) => ({
        type: actions.DELETE_CAMPAIGN_DURATION,
        id,
        cbSuccess,
        cbError,
    }),
    getCampaignDurationDetail: (id) => ({
        type: actions.GET_CAMPAIGN_DURATION_DETAIL,
        payload: { id },
    }),
};

export default actions;

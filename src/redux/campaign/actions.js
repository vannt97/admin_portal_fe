const actions = {
    GET_CAMPAIGN: 'GET_CAMPAIGN',
    GET_CAMPAIGN_SUCCESS: 'GET_CAMPAIGN_SUCCESS',
    GET_CAMPAIGN_ERROR: 'GET_CAMPAIGN_ERROR',

    GET_CAMPAIGN_DETAIL: 'GET_CAMPAIGN_DETAIL',
    GET_CAMPAIGN_DETAIL_SUCCESS: 'GET_CAMPAIGN_DETAIL_SUCCESS',
    GET_CAMPAIGN_DETAIL_ERROR: 'GET_CAMPAIGN_DETAIL_ERROR',

    EXPORT_CAMPAIGN: 'EXPORT_CAMPAIGN',
    EXPORT_CAMPAIGN_SUCCESS: 'EXPORT_CAMPAIGN_SUCCESS',

    CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
    UPDATE_CAMPAIGN: 'UPDATE_CAMPAIGN',
    DELETE_CAMPAIGN: 'DELETE_CAMPAIGN',

    //#region CRUD

    getCampaign: (body) => ({
        type: actions.GET_CAMPAIGN,
        body,
    }),

    exportCampaign: (body, cbError) => ({
        type: actions.EXPORT_CAMPAIGN,
        body,
        cbError,
    }),

    createCampaign: (body, cbSuccess, cbError) => ({
        type: actions.CREATE_CAMPAIGN,
        body,
        cbSuccess,
        cbError,
    }),
    updateCampaign: (id, body, cbSuccess, cbError) => ({
        type: actions.UPDATE_CAMPAIGN,
        id,
        body,
        cbSuccess,
        cbError,
    }),
    deleteCampaign: (id, cbSuccess, cbError) => ({
        type: actions.DELETE_CAMPAIGN,
        id,
        cbSuccess,
        cbError,
    }),
    getCampaignDetail: (id) => ({
        type: actions.GET_CAMPAIGN_DETAIL,
        payload: { id },
    }),
};

export default actions;

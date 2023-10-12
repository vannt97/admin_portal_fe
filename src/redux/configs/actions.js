const actions = {

    GET_CONFIGS: 'GET_CONFIGS',
    GET_CONFIGS_SUCCESS: 'GET_CONFIGS_SUCCESS',

    GET_CONFIG_DETAIL: 'GET_CONFIG_DETAIL',
    GET_CONFIG_DETAIL_SUCCESS: 'GET_CONFIG_DETAIL_SUCCESS',

    UPDATE_CONFIG: 'UPDATE_CONFIG',
    CONFIGS_LOADING_FALSE: 'CONFIGS_LOADING_FALSE',

    getConfigs: model => ({
        type: actions.GET_CONFIGS,
        payload: { model }
    }),
    getConfigDetail: key => ({
        type: actions.GET_CONFIG_DETAIL,
        payload: { key }
    }),
    updateConfig: (model, cbSuccess, cbError) => ({
        type: actions.UPDATE_CONFIG,
        payload: { model },
        cbSuccess, cbError
    }),


}

export default actions; 
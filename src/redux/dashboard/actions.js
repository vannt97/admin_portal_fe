const actions = {
  GET_STATISTICS: "GET_STATISTICS",
  GET_STATISTICS_SUCCESS: "GET_STATISTICS_SUCCESS",
  GET_STATISTICS_ERROR: "GET_STATISTICS_ERROR",
  STATISTICS_LOADING_FALSE: 'STATISTICS_LOADING_FALSE',

  GET_DASHBOARD: 'GET_DASHBOARD',
  GET_DASHBOARD_SUCCESS: 'GET_DASHBOARD_SUCCESS',
  //#region CRUD

  getStatistics: model => ({
    type: actions.GET_STATISTICS,
    payload: { model }
  }),

  getDashboard: model => ({
    type: actions.GET_DASHBOARD,
    payload: { model }
  }),

};

export default actions;

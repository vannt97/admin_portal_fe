const actions = {
  GET_TREE_JOURNEY: 'GET_TREE_JOURNEY',
  GET_TREE_JOURNEY_SUCCESS: 'GET_TREE_JOURNEY_SUCCESS',
  GET_TREE_JOURNEY_ERROR: 'GET_TREE_JOURNEY_ERROR',

  EXPORT_TREE_JOURNEY: 'EXPORT_TREE_JOURNEY',
  EXPORT_TREE_JOURNEY_SUCCESS: 'EXPORT_TREE_JOURNEY_SUCCESS',

  GET_TREE_JOURNEY_DETAIL: 'GET_TREE_JOURNEY_DETAIL',
  GET_TREE_JOURNEY_DETAIL_SUCCESS: 'GET_TREE_JOURNEY_DETAIL_SUCCESS',
  GET_TREE_JOURNEY_DETAIL_ERROR: 'GET_TREE_JOURNEY_DETAIL_ERROR',

  CREATE_TREE_JOURNEY: 'CREATE_TREE_JOURNEY',
  UPDATE_TREE_JOURNEY: 'UPDATE_TREE_JOURNEY',
  DELETE_TREE_JOURNEY: 'DELETE_TREE_JOURNEY',

  UPDATE_TREE_HISTORY: 'UPDATE_TREE_HISTORY',

  //#region CRUD
  getTreeJourney: (body) => ({
    type: actions.GET_TREE_JOURNEY,
    body,
  }),

  exportTreeJourney: (body, cbError) => ({
    type: actions.EXPORT_TREE_JOURNEY,
    body,
    cbError,
  }),

  createTreeJourney: (body, cbSuccess, cbError) => ({
    type: actions.CREATE_TREE_JOURNEY,
    body,
    cbSuccess,
    cbError,
  }),
  updateTreeJourney: (id, body, cbSuccess, cbError) => ({
    type: actions.UPDATE_TREE_JOURNEY,
    id,
    body,
    cbSuccess,
    cbError,
  }),
  deleteTreeJourney: (id, cbSuccess, cbError) => ({
    type: actions.DELETE_TREE_JOURNEY,
    id,
    cbSuccess,
    cbError,
  }),
  getTreeJourneyDetail: (id) => ({
    type: actions.GET_TREE_JOURNEY_DETAIL,
    payload: { id },
  }),

  updateTreeHistory: (body, cbSuccess, cbError,) => ({
    type: actions.UPDATE_TREE_HISTORY,
    body,
    cbSuccess,
    cbError,
  })

};

export default actions;

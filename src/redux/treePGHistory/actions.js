const actions = {
  GET_TREE_PG_HISTORY: 'GET_TREE_PG_HISTORY',
  GET_TREE_PG_HISTORY_SUCCESS: 'GET_TREE_PG_HISTORY_SUCCESS',
  GET_TREE_PG_HISTORY_ERROR: 'GET_TREE_PG_HISTORY_ERROR',

  EXPORT_TREE_PG_HISTORY: 'EXPORT_TREE_PG_HISTORY',

  //#region CRUD

  getTreePGHistory: (body) => ({
    type: actions.GET_TREE_PG_HISTORY,
    body
  }),

  exportTreePGHistory: (body, cbSuccess) => ({
    type: actions.EXPORT_TREE_PG_HISTORY,
    body, cbSuccess
  }),


};

export default actions;

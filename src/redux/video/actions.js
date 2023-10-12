const actions = {
  GET_VIDEO: 'GET_VIDEO',
  GET_VIDEO_SUCCESS: 'GET_VIDEO_SUCCESS',
  GET_VIDEO_ERROR: 'GET_VIDEO_ERROR',

  EXPORT_VIDEO: 'EXPORT_VIDEO',
  EXPORT_VIDEO_SUCCESS: 'EXPORT_VIDEO_SUCCESS',

  GET_VIDEO_DETAIL: 'GET_VIDEO_DETAIL',
  GET_VIDEO_DETAIL_SUCCESS: 'GET_VIDEO_DETAIL_SUCCESS',
  GET_VIDEO_DETAIL_ERROR: 'GET_VIDEO_DETAIL_ERROR',

  CREATE_VIDEO: 'CREATE_VIDEO',
  UPDATE_VIDEO: 'UPDATE_VIDEO',
  DELETE_VIDEO: 'DELETE_VIDEO',

  //#region CRUD

  getVideo: (body) => ({
    type: actions.GET_VIDEO,
    body,
  }),

  createVideo: (body, cbSuccess, cbError) => ({
    type: actions.CREATE_VIDEO,
    body,
    cbSuccess,
    cbError,
  }),

  exportVideo: (body, cbSuccess, cbError) => ({
    type: actions.EXPORT_VIDEO,
    body,
    cbSuccess,
    cbError,
  }),

  updateVideo: (id, body, cbSuccess, cbError) => ({
    type: actions.UPDATE_VIDEO,
    id,
    body,
    cbSuccess,
    cbError,
  }),

  deleteVideo: (id, cbSuccess, cbError) => ({
    type: actions.DELETE_VIDEO,
    id,
    cbSuccess,
    cbError,
  }),
  getVideoDetail: (id) => ({
    type: actions.GET_VIDEO_DETAIL,
    payload: { id },
  }),
};

export default actions;

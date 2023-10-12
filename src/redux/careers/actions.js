const actions = {
  GET_CAREERS: "GET_CAREERS",
  GET_CAREERS_SUCCESS: "GET_CAREERS_SUCCESS",

  GET_CAREER_DETAIL: "GET_CAREER_DETAIL",
  GET_CAREER_DETAIL_SUCCESS: "GET_CAREER_DETAIL_SUCCESS",

  CREATE_CAREER: "CREATE_CAREER",
  UPDATE_CAREER: "UPDATE_CAREER",
  DELETE_CAREER: "DELETE_CAREER",

  CAREER_LOADING_FALSE: 'CAREER_LOADING_FALSE',
  //#region CRUD

  getCareers: model => ({
    type: actions.GET_CAREERS,
    payload: { model }
  }),

  createCareer: (model, cbSuccess, cbError) => ({
    type: actions.CREATE_CAREER,
    payload: { model },
    cbSuccess,
    cbError
  }),
  updateCareer: (model, cbSuccess, cbError) => ({
    type: actions.UPDATE_CAREER,
    payload: { model },
    cbSuccess,
    cbError
  }),
  deleteCareer: (id, cbSuccess, cbError) => ({
    type: actions.DELETE_CAREER,
    payload: { id },
    cbSuccess,
    cbError
  }),
  getCareerDetail: id => ({
    type: actions.GET_CAREER_DETAIL,
    payload: { id }
  }),
};

export default actions;

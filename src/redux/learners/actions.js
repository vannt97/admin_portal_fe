const actions = {

  GET_LEARNERS: "GET_LEARNERS",
  GET_LEARNERS_SUCCESS: "GET_LEARNERS_SUCCESS",
  GET_LEARNERS_ERROR: 'GET_LEARNERS_ERROR',

  GET_LEARNER_DETAIL: "GET_LEARNER_DETAIL",
  GET_LEARNER_DETAIL_SUCCESS: "GET_LEARNER_DETAIL_SUCCESS",
  GET_LEARNER_DETAIL_ERROR: 'GET_LEARNER_DETAIL_ERROR',

  GET_SUBCRIPTION_DETAIL: "GET_SUBCRIPTION_DETAIL",
  GET_SUBCRIPTION_DETAIL_SUCCESS: "GET_SUBCRIPTION_DETAIL_SUCCESS",
  GET_SUBCRIPTION_DETAIL_ERROR: 'GET_SUBCRIPTION_DETAIL_ERROR',

  CREATE_LEARNER: "CREATE_LEARNER",
  CREATE_SUBCRIPTION: "CREATE_SUBCRIPTION",
  UPDATE_SUBCRIPTION: "UPDATE_SUBCRIPTION",
  UPDATE_LEARNER: "UPDATE_LEARNER",
  DELETE_LEARNER: "DELETE_LEARNER",

  GET_SUBCRIPTIONS: "GET_SUBCRIPTIONS",
  GET_SUBCRIPTIONS_SUCCESS: "GET_SUBCRIPTIONS_SUCCESS",

  GET_LEARNVOCAKEYS: "GET_LEARNVOCAKEYS",
  GET_LEARNVOCAKEYS_SUCCESS: "GET_LEARNVOCAKEYS_SUCCESS",

  LEARNER_LOADING_FALSE: 'LEARNER_LOADING_FALSE',

  EXPORT_LEARNER: 'EXPORT_LEARNER',
  EXPORT_LEARNER_SUCCESS: 'EXPORT_LEARNER_SUCCESS',

  EXPORT_ALL_LEARNER: 'EXPORT_ALL_LEARNER',
  EXPORT_ALL_LEARNER_SUCCESS: 'EXPORT_ALL_LEARNER_SUCCESS',

  GET_LEARNER_MOCK_TEST: 'GET_LEARNER_MOCK_TEST',
  GET_LEARNER_MOCK_TEST_SUCCESS: 'GET_LEARNER_MOCK_TEST_SUCCESS',

  GET_LEARNER_MOCK_TEST_DETAIL: 'GET_LEARNER_MOCK_TEST_DETAIL',
  GET_LEARNER_MOCK_TEST_DETAIL_SUCCESS: 'GET_LEARNER_MOCK_TEST_DETAIL_SUCCESS',

  //#region CRUD

  getLearners: model => ({
    type: actions.GET_LEARNERS,
    payload: { model }
  }),

  createLearner: (model, cbSuccess, cbError) => ({
    type: actions.CREATE_LEARNER,
    payload: { model },
    cbSuccess,
    cbError
  }),
  updateLearner: (model, cbSuccess, cbError) => ({
    type: actions.UPDATE_LEARNER,
    payload: { model },
    cbSuccess,
    cbError
  }),
  deleteLearner: (id, cbSuccess, cbError) => ({
    type: actions.DELETE_LEARNER,
    payload: { id },
    cbSuccess,
    cbError
  }),
  getLearnerDetail: id => ({
    type: actions.GET_LEARNER_DETAIL,
    payload: { id }
  }),

  createSubcription: (model, learnerId, cbSuccess, cbError) => ({
    type: actions.CREATE_SUBCRIPTION,
    payload: { model, learnerId },
    cbSuccess,
    cbError
  }),
  getSubcriptions: (model, learnerId) => ({
    type: actions.GET_SUBCRIPTIONS,
    payload: { model, learnerId }
  }),
  getSubcriptionDetail: id => ({
    type: actions.GET_SUBCRIPTION_DETAIL,
    payload: { id }
  }),
  updateSubcription: (model, cbSuccess, cbError) => ({
    type: actions.UPDATE_SUBCRIPTION,
    payload: { model },
    cbSuccess,
    cbError
  }),
  getLearnVocakeys: (model, learnerId) => ({
    type: actions.GET_LEARNVOCAKEYS,
    payload: { model, learnerId }
  }),

  exportLearner: (model) => ({
    type: actions.EXPORT_LEARNER,
    payload: { model }
  }),

  exportAllLearner: (model) => ({
    type: actions.EXPORT_ALL_LEARNER,
    payload: { model }
  }),

  getLearnerMockTest: (model) => ({
    type: actions.GET_LEARNER_MOCK_TEST,
    payload: { model }
  }),

  getLearnerMockTestDetail: (model) => ({
    type: actions.GET_LEARNER_MOCK_TEST_DETAIL,
    payload: { model }
  })

};

export default actions;

import actions from "./actions";

const initState = {
  learners: [],
  learnerDetail: {},
  subcriptionDetail: {},
  subcriptions: [],
  permissions: {},
  loading: false,
  totalItems: 0,
  export: null,
  allExport: null,
  learnerMockTestData: null,
  learnerMockTestDetailData: null
};

export default function learnerReducer(state = initState, action) {
  switch (action.type) {
    //#region CRUD
    case actions.GET_LEARNERS:
      return { ...state, loading: true, totalItems: 0 };
    case actions.GET_LEARNERS_SUCCESS:
      let { data, totalItems } = action.payload;
      let res = data ? data : [];
      return { ...state, learners: res, totalItems, loading: false };
    case actions.GET_LEARNERS_ERROR:
      return { ...state, loading: false, learners: [], totalItems: 0 };

    case actions.GET_LEARNER_DETAIL:
      return { ...state, loading: true, totalItems: 0 };
    case actions.GET_LEARNER_DETAIL_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, learnerDetail: res, loading: false };
    }

    case actions.GET_SUBCRIPTIONS:
      return { ...state, loading: true, totalItems: 0 };
    case actions.GET_SUBCRIPTIONS_SUCCESS: {
      let { data, totalItems } = action.payload;
      let res = data ? data : {};
      return { ...state, subcriptions: res, totalItems, loading: false };
    }

    case actions.GET_LEARNVOCAKEYS:
      return { ...state, loading: true, totalItems: 0 };
    case actions.GET_LEARNVOCAKEYS_SUCCESS: {
      let { data, totalLearnVocakeys } = action.payload;
      let res = data ? data : {};
      return { ...state, learnVocakeys: res, totalLearnVocakeys, loading: false };
    }

    case actions.GET_SUBCRIPTION_DETAIL:
      return { ...state, loading: true, totalItems: 0 };
    case actions.GET_SUBCRIPTION_DETAIL_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, subcriptionDetail: res, loading: false };
    }

    case actions.EXPORT_LEARNER_SUCCESS:
      return { ...state, export: action.payload };

    case actions.EXPORT_ALL_LEARNER_SUCCESS:
      return { ...state, allExport: action.payload.data };

    case actions.GET_LEARNER_MOCK_TEST_SUCCESS:
      return { ...state, learnerMockTestData: action.payload.data, loading: false };

    case actions.GET_LEARNER_MOCK_TEST_DETAIL_SUCCESS:
      return { ...state, learnerMockTestDetailData: action.payload.data, loading: false };

    case actions.LEARNER_LOADING_FALSE: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}

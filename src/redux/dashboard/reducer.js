import actions from "./actions";

const initState = {
  statistic: {},
  dashboardData: null,
  loading: false,
};

export default function dashboardReducer(state = initState, action) {
  switch (action.type) {
    //#region CRUD
    case actions.GET_STATISTICS:
      return { ...state, loading: true, totalItems: 0 };

    case actions.GET_STATISTICS_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, statistic: res, loading: false };
    }

    case actions.GET_DASHBOARD_SUCCESS: {
      let { data } = action.payload;
      return { ...state, dashboardData: data, loading: false };
    }
    case actions.STATISTICS_LOADING_FALSE: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
}

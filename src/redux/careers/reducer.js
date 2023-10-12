import actions from "./actions";

const initState = {  
  careers: [],
  careerDetail: {},
  permissions: {},
  loading: false,
  totalItems: 0,

};

export default function careerReducer(state = initState, action) {
  switch (action.type) {
    //#region CRUD
    case actions.GET_CAREERS:
      return { ...state, loading: true, totalItems: 0 };

    case actions.GET_CAREERS_SUCCESS:
      let { data, totalItems } = action.payload;
      let res = data ? data : [];
      return { ...state, careers: res, totalItems, loading: false };

    case actions.GET_CAREER_DETAIL:
      return { ...state, loading: true, totalItems: 0 };

    case actions.GET_CAREER_DETAIL_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, careerDetail: res, loading: false };
    }
    case actions.CAREER_LOADING_FALSE:{
      return { ...state,  loading: false };
    }

    default:
      return state;
  }
}

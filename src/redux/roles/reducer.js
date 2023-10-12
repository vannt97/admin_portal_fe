import actions from "./actions";

const initState = {
  titleStore: {
    titlesData: [],
    loading: false,
    totalItems: 0
  },
  titleStoreDetail: {
    titlesDetailData: {},
    loadingDT: false
  },
  titlePermissionsTitle: {
    titlesPermissionsData: {},
    loadingP: false
  },

  roles: [],
  roleDetail: {},
  permissions: {},
  loading: false,
  totalItems: 0,

};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    //#region CRUD
    case actions.GET_ROLES:
      return { ...state, loading: true, totalItems: 0 };

    case actions.GET_ROLES_SUCCESS:
      let { data, totalItems } = action.payload;
      let res = data ? data : [];
      return { ...state, roles: res, totalItems, loading: false };

    case actions.GET_ROLE_DETAIL:
      return { ...state, loading: true, totalItems: 0 };

    case actions.GET_ROLE_DETAIL_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, roleDetail: res, loading: false };
    }
    //#endregion

    //#region ACCESS PERMISSION
    case actions.ROLE_ACCESS_PERMISSTION:
      return { ...state, loading: true };
    case actions.ROLE_ACCESS_PERMISSTION_SUCCESS: {
      let { data } = action.payload;
      let res = data ? data : {};
      return { ...state, permissions: res, loading: false };
    }
    //#endregion

    default:
      return state;
  }
}

import actions from './actions';

const initState = {
    users: [],
    userDetail: {},
    loading: false,
    totalItems: 0,
    permissions: {}
};

export default function userReducer(state = initState, action) {
    switch (action.type) {

        //#region CRUD
        case actions.GET_USERS:
            return { ...state, loading: true, totalItems: 0 };
        case actions.GET_USERS_SUCCESS: {
            let { data, totalItems } = action.payload;
            let res = data ? data : [];
            return { ...state, users: res, totalItems: totalItems, loading: false };
        }
        case actions.GET_USERS_ERROR:
            return { ...state, loading: false };

        case actions.GET_USER_DETAIL:
            return { ...state, loading: true };
        case actions.GET_USER_DETAIL_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, userDetail: res, loading: false };
        }
        case actions.GET_USER_DETAIL_ERROR:
            return { ...state, loading: false };
        //#endregion


        //#region ACCESS PERMISSION
        case actions.USER_ACCESS_PERMISSTION:
            return { ...state, loading: true };
        case actions.USER_ACCESS_PERMISSTION_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, permissions: res, loading: false };
        }
        case actions.USER_ACCESS_PERMISSTION_ERROR:
            return { ...state, loading: false };
        //#endregion

        default:
            return state;

    }
}

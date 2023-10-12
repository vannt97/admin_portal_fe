import actions from './actions';

const initState = {
    userLoginProfile: {},
    roles: [],
    loading: false
};

export default function accountReducer(state = initState, action) {
    switch (action.type) {

        //#region USER LOGIN FROFILE
        case actions.USER_LOGIN_PROFILE:
            return { ...state, loading: true };
        case actions.USER_LOGIN_PROFILE_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, userLoginProfile: res, loading: false };
        }
        case actions.USER_LOGIN_PROFILE_ERROR:
            return { ...state, loading: false };

        //#endregion

        //#region ROLES
        case actions.ACCOUNT_ROLES:
            return { ...state };
        case actions.ACCOUNT_ROLES_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : {};
            return { ...state, roles: res, loading: false };
        }
        //#endregion

        case actions.ACCOUNT_LOADING_FALSE:
            return { ...state, loading: false };


        default:
            return state;

    }
}

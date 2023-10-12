const actions = {

    USER_LOGIN_PROFILE: 'USER_LOGIN_PROFILE',
    USER_LOGIN_PROFILE_SUCCESS: 'USER_LOGIN_PROFILE_SUCCESS',
    USER_LOGIN_PROFILE_ERROR: 'USER_LOGIN_PROFILE_ERROR',
    USER_LOGIN_UPDATE_PROFILE: 'USER_LOGIN_UPDATE_PROFILE',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',

    ACCOUNT_ROLES: 'ACCOUNT_ROLES',
    ACCOUNT_ROLES_SUCCESS: 'ACCOUNT_ROLES_SUCCESS',

    ACCOUNT_LOADING_FALSE: 'ACCOUNT_LOADING_FALSE',
    changePassword: (model, cbSuccess, cbError) => ({
        type: actions.CHANGE_PASSWORD,
        payload: { model },
        cbSuccess,
        cbError
    }),
    userLoginProfile: () => ({
        type: actions.USER_LOGIN_PROFILE,
    }),

    updateUserLoginProfile: (model, cbSuccess, cbError) => ({
        type: actions.USER_LOGIN_UPDATE_PROFILE,
        payload: { model },
        cbSuccess, cbError
    }),

    accountRoles: () => ({
        type: actions.ACCOUNT_ROLES,
    }),

}

export default actions;
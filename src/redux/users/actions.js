const actions = {

    GET_USERS: 'GET_USERS',
    GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
    GET_USERS_ERROR: 'GET_USERS_ERROR',

    GET_USER_DETAIL: 'GET_USER_DETAIL',
    GET_USER_DETAIL_SUCCESS: 'GET_USER_DETAIL_SUCCESS',
    GET_USER_DETAIL_ERROR: 'GET_USER_DETAIL_ERROR',

    CREATE_USER: 'CREATE_USER',
    UPDATE_USER: 'UPDATE_USER',
    USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',

    DELETE_USER: 'DELETE_USER',

    USER_ACCESS_PERMISSTION: 'USER_ACCESS_PERMISSTION',
    USER_ACCESS_PERMISSTION_SUCCESS: 'USER_ACCESS_PERMISSTION_SUCCESS',
    USER_ACCESS_PERMISSTION_ERROR: 'USER_ACCESS_PERMISSTION_ERROR',

    UPDATE_USER_ACCESS_PERMISSTION: 'UPDATE_USER_ACCESS_PERMISSTION',
    //#region CRUD
    getUsers: model => ({
        type: actions.GET_USERS,
        payload: { model }
    }),
    deleteUser: (id, cbSuccess, cbError) => ({
        type: actions.DELETE_USER,
        payload: { id },
        cbSuccess, cbError
    }),
    getUserDetail: id => ({
        type: actions.GET_USER_DETAIL,
        payload: { id }
    }),
    createUser: (model, cbSuccess, cbError) => ({
        type: actions.CREATE_USER,
        payload: { model },
        cbSuccess, cbError
    }),
    updateUser: (model, cbSuccess, cbError) => ({
        type: actions.UPDATE_USER,
        payload: { model },
        cbSuccess, cbError
    }),
    //#endregion

    resetPassword: (model, cbSuccess, cbError) => ({
        type: actions.USER_RESET_PASSWORD,
        payload: { model },
        cbSuccess, cbError
    }),

   

    //#region ACCESS PERMISSION
    userAccessPermission: id => ({
        type: actions.USER_ACCESS_PERMISSTION,
        payload: { id },
    }),
    updateUserAccessPermission: (model, cbSuccess, cbError) => ({
        type: actions.UPDATE_USER_ACCESS_PERMISSTION,
        payload: { model },
        cbSuccess, cbError
    }),
    //#endregion
}

export default actions;
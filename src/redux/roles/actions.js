const actions = {
  GET_ROLES: "GET_ROLES",
  GET_ROLES_SUCCESS: "GET_ROLES_SUCCESS",

  GET_ROLE_DETAIL: "GET_ROLE_DETAIL",
  GET_ROLE_DETAIL_SUCCESS: "GET_ROLE_DETAIL_SUCCESS",

  CREATE_ROLE: "CREATE_ROLE",
  UPDATE_ROLE: "UPDATE_ROLE",
  DELETE_ROLE: "DELETE_ROLE",

  ROLE_ACCESS_PERMISSTION: 'ROLE_ACCESS_PERMISSTION',
  ROLE_ACCESS_PERMISSTION_SUCCESS: 'ROLE_ACCESS_PERMISSTION_SUCCESS',

  UPDATE_ROLE_ACCESS_PERMISSTION: 'UPDATE_ROLE_ACCESS_PERMISSTION',

  ROLE_LOADING_FALSE: 'ROLE_LOADING_FALSE',
  //#region CRUD

  getRoles: model => ({
    type: actions.GET_ROLES,
    payload: { model }
  }),

  createRole: (model, cbSuccess, cbError) => ({
    type: actions.CREATE_ROLE,
    payload: { model },
    cbSuccess,
    cbError
  }),
  updateRole: (model, cbSuccess, cbError) => ({
    type: actions.UPDATE_ROLE,
    payload: { model },
    cbSuccess,
    cbError
  }),
  deleteRole: (id, cbSuccess, cbError) => ({
    type: actions.DELETE_ROLE,
    payload: { id },
    cbSuccess,
    cbError
  }),
  getRoleDetail: id => ({
    type: actions.GET_ROLE_DETAIL,
    payload: { id }
  }),
  //#endregion
  //#region Role PERMISSION
  roleAccessPermission: id => ({
    type: actions.ROLE_ACCESS_PERMISSTION,
    payload: { id }
  }),
  updateRoleAccessPermission: (model, cbSuccess, cbError) => ({
    type: actions.UPDATE_ROLE_ACCESS_PERMISSTION,
    payload: { model },
    cbSuccess,
    cbError
  })
  //#endregion
};

export default actions;

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  CHECK_TOKEN_RESET_PASSWORD: 'CHECK_TOKEN_RESET_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',

  checkAuthorization: () => ({
    type: actions.CHECK_AUTHORIZATION
  }),

  login: (model, cbError) => ({
    type: actions.LOGIN_REQUEST,
    payload: { model },
    cbError
  }),

  logout: () => ({
    type: actions.LOGOUT,
  }),

  //#region Forgot pw
  forgotPassword: (model, cbSuccess, cbError) => ({
    type: actions.FORGOT_PASSWORD,
    payload: { model },
    cbSuccess, cbError
  }),

  checkTokenResetPassword: (model, history) => ({
    type: actions.CHECK_TOKEN_RESET_PASSWORD,
    payload: { model },
    history
  }),

  resetPassword: (model, cbSuccess, cbError) => ({
    type: actions.RESET_PASSWORD,
    payload: { model },
    cbSuccess, cbError
  }),

  //#endregion

};
export default actions;

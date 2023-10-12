import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

export const login = body => {
    var url = ApiRouters.LOGIN;
    return api.post(url, body);
}

export const forgotPassword = body => {
    var url = ApiRouters.FORGOT_PASSWORD;
    return api.post(url, body);
}

export const checkTokenResetPassword = body => {
    return api.post(ApiRouters.CHECK_TOKEN_RESET_PW, body);
}

export const resetPassword = body => {
    return api.post(ApiRouters.RESET_PASSWORD, body);
}
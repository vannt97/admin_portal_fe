import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

export const changePassword = body => {
    var url = ApiRouters.CHANGE_PASSWORD;
    return api.post(url, body);
}
export const userLoginProfile = () => {
    var url = ApiRouters.USER_LOGIN_PROFILE;
    return api.get(url);
}
export const updateUserLoginProfile = body => {
    var url = ApiRouters.USER_LOGIN_PROFILE;
    return api.put(url, body);
}
export const accountRoles = () => {
    var url = ApiRouters.ACCOUNT + '/Roles';
    return api.get(url);
}
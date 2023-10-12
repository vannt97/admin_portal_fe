import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

export const getUsers = body => {
    var url = ApiRouters.USER;
    return api.get(url, { params: body });
};
export const deleteUser = id => {
    var url = `${ApiRouters.USER}/${id}`;
    return api.delete(url);
};
export const getUserDetail = id => {
    var url = `${ApiRouters.USER}/${id}`;
    return api.get(url);
};
export const createUser = body => {
    var url = ApiRouters.USER;
    return api.post(url, body);
};
export const updateUser = body => {
    var url = `${ApiRouters.USER}/${body.id}`;
    return api.put(url, body);
};
export const resetPassword = body => {
    var url = `${ApiRouters.USER}/ResetPassword/${body.id}`;
    return api.put(url, body);
};
export const userAccessPermission = id => {
    var url = `${ApiRouters.USER}/${id}/Roles`;;
    return api.get(url);
};
export const updateUserAccessPermission = body => {
    var url = `${ApiRouters.USER}/${body.id}/Roles`;;
    return api.put(url, body);
};

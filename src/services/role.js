import { api } from "@iso/utils/axios.configs";
import { ApiRouters } from "@iso/utils/apiRouters";

export const getRoles = body => {
  var url = ApiRouters.ROLE;
  return api.get(url, { params: body });
};
export const createRole = body => {
  var url = ApiRouters.ROLE;
  return api.post(url, body);
};
export const updateRole = body => {
  var url = `${ApiRouters.ROLE}/${body.id}`;
  return api.put(url,body);
};
export const deleteRole = id => {
  var url = `${ApiRouters.ROLE}/${id}`;
  return api.delete(url);
};
export const getRoleDetail = id => {
  var url = `${ApiRouters.ROLE}/${id}`;
  return api.get(url);
};
export const roleAccessPermission = id => {
    var url = `${ApiRouters.ROLE}/${id}/Roles`;;
    return api.get(url);
};
export const updateRoleAccessPermission = body => {
    var url = `${ApiRouters.ROLE}/${body.id}/Roles`;;
    return api.put(url, body);
};
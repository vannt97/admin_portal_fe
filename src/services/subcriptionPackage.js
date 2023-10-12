import { api } from "@iso/utils/axios.configs";
import { ApiRouters } from "@iso/utils/apiRouters";

export const getSubcriptionPackages = body => {
  var url = ApiRouters.SUBCRIPTIONPACKAGE;
  return api.get(url, { params: body });
};
export const createSubcriptionPackage = body => {
  var url = ApiRouters.SUBCRIPTIONPACKAGE;
  return api.post(url, body);
};
export const updateSubcriptionPackage = body => {
  var url = `${ApiRouters.SUBCRIPTIONPACKAGE}/${body.id}`;
  return api.put(url,body);
};
export const deleteSubcriptionPackage = id => {
  var url = `${ApiRouters.SUBCRIPTIONPACKAGE}/${id}`;
  return api.delete(url);
};
export const getSubcriptionPackageDetail = id => {
  var url = `${ApiRouters.SUBCRIPTIONPACKAGE}/${id}`;
  return api.get(url);
};
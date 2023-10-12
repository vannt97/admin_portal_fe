import { api } from "@iso/utils/axios.configs";
import { ApiRouters } from "@iso/utils/apiRouters";

export const getCareers = body => {
  var url = ApiRouters.CAREER;
  return api.get(url, { params: body });
};
export const createCareer = body => {
  var url = ApiRouters.CAREER;
  return api.post(url, body);
};
export const updateCareer = body => {
  var url = `${ApiRouters.CAREER}/${body.id}`;
  return api.put(url,body);
};
export const deleteCareer = id => {
  var url = `${ApiRouters.CAREER}/${id}`;
  return api.delete(url);
};
export const getCareerDetail = id => {
  var url = `${ApiRouters.CAREER}/${id}`;
  return api.get(url);
};
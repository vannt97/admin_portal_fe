import { api, exportAxios } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';
import Axios from 'axios';
export const getLearners = params => {
  var url = ApiRouters.LEARNER;
  return api.get(url, { params });
};
export const getLearnerDetail = (id, params) => {
  var url = `${ApiRouters.LEARNER}/${id}`;
  return api.get(url, { params });
};
export const createLearner = body => {
  var url = ApiRouters.LEARNER;
  return api.post(url, body);
};
export const updateLearner = body => {
  var url = `${ApiRouters.LEARNER}/${body.id}`;
  return api.put(url, body);
};
export const deleteLearner = id => {
  var url = `${ApiRouters.LEARNER}/${id}`;
  return api.delete(url);
};
export const createSubcription = (body, learnerId) => {
  var url = `${ApiRouters.LEARNER}/${learnerId}/Subcription`;
  return api.post(url, body);
};
export const getSubcriptions = (params, learnerId) => {
  var url = `${ApiRouters.LEARNER}/${learnerId}/Subcription`;
  return api.get(url, { params });
};
export const getSubcriptionDetail = (id, params) => {
  var url = `${ApiRouters.LEARNER}/Subcription/${id}`;
  return api.get(url, { params });
};
export const updateSubcription = body => {
  var url = `${ApiRouters.LEARNER}/Subcription/${body.id}`;
  return api.put(url, body);
};
export const getLearnVocakeys = (params, learnerId) => {
  var url = `${ApiRouters.LEARNER}/${learnerId}/LearnVocakey`;
  return api.get(url, { params });
};
export const exportLeaner = (params) => {
  var url = `${ApiRouters.LEARNER}/ExportInforLearner`;
  return Axios(exportAxios(url, params));
};

export const exportAllLeaner = (params) => {
  var url = `${ApiRouters.LEARNER}/ExportInforAllLearner`;
  return api.get(url, { params });
};
export const getLearnerMockTest = model => {
  var url = `${ApiRouters.LEARNER}/${model}/GetAllLearningTestExamOfLearner`;
  return api.get(url);
};
export const getLearnerMockTestDetail = (params) => {
  var url = `${ApiRouters.LEARNER}/DetailLearningTestExamOfLearner`;
  return api.get(url, { params });
};
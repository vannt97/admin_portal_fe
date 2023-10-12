import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

//#region PRODUCT TYPE
export const getFAQs = (body) => {
	var url = ApiRouters.FAQs;
	return api.get(url, { params: body });
};
export const createFAQ = (body) => {
	var url = ApiRouters.FAQs;
	return api.post(url, body);
};
export const deleteFAQ = (id) => {
	var url = `${ApiRouters.FAQs}/${id}`;
	return api.delete(url);
};
export const getFAQDetail = (id) => {
	var url = `${ApiRouters.FAQs}/${id}`;
	return api.get(url);
};
export const updateFAQ = (body) => {
	var url = `${ApiRouters.FAQs}/${body.id}`;
	return api.put(url, body);
};
//#endregion

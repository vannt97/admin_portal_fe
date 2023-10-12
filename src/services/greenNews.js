import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getGreenNews = (body) => {
	const url = `${ApiRouters.MANAGEMENT_GREEN_NEWS}`;
	return api.get(url, { params: body });
};

const createGreenNews = (body) => {
	const url = `${ApiRouters.MANAGEMENT_GREEN_NEWS}`;
	return api.post(url, body);
};

const updateGreenNews = (id, body) => {
	const url = `${ApiRouters.MANAGEMENT_GREEN_NEWS}/${id}`;
	return api.put(url, body);
};

const deleteGreenNews = (id) => {
	const url = `${ApiRouters.MANAGEMENT_GREEN_NEWS}/${id}`;
	return api.delete(url);
};

const greenNewsService = {
	getGreenNews,
	createGreenNews,
	deleteGreenNews,
	updateGreenNews,
};

export default greenNewsService;

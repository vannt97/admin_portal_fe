import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getPG = (params) => {
	const url = `${ApiRouters.MANAGE_PG}`;
	return api.get(url, { params: params });
};

const getPGDetail = (params) => {
	const url = `${ApiRouters.MANAGE_PG}/${params}`;
	return api.get(url);
};

const createPG = (body) => {
	const url = `${ApiRouters.MANAGE_PG}`;
	return api.post(url, body);
};

const importPG = (body) => {
	const url = `${ApiRouters.IMPORT_PG}`;
	return api.post(url, body);
};

const updatePG = (id, body) => {
	const url = `${ApiRouters.MANAGE_PG}/${id}`;
	return api.put(url, body);
};

const deletePG = (id) => {
	const url = `${ApiRouters.MANAGE_PG}/${id}`;
	return api.delete(url);
};

const pgService = {
	getPG,
	createPG,
	deletePG,
	updatePG,
	getPGDetail,
	importPG,
};

export default pgService;

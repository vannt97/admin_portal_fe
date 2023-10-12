import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getManagementsTree = (params) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE}`;
	return api.get(url, { params: params });
};

const getSiteAndType = () => {
	const url = `${ApiRouters.GET_SITE_AND_TYPE}`;
	return api.get(url);
};

const getTreeDetail = (id) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE}/${id}`;
	return api.get(url);
};

const createTree = (body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE}`;
	return api.post(url, body);
};

const updateTree = (id, body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE}/${id}`;
	return api.put(url, body);
};

const deleteTree = (id) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE}/${id}`;
	return api.delete(url);
};

const getTreeShare = (params) => {
	const url = `${ApiRouters.GET_TREE_SHARE}?DateFrom=${params.dateFrom}&DateTo=${params.dateTo}`;
	return api.get(url, params);
};

const getTreeShareAll = (params) => {
	const url = `${ApiRouters.GET_TREE_SHARE_ALL}?DateFrom=${params.dateFrom}&DateTo=${params.dateTo}&Search=${params.search}&Limit=${params.limit}`;
	return api.get(url, params);
};

const treeSiteService = {
	getManagementsTree,
	createTree,
	updateTree,
	deleteTree,
	getSiteAndType,
	getTreeDetail,
	getTreeShare,
	getTreeShareAll
};

export default treeSiteService;

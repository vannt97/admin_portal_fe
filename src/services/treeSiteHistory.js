import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreeSiteHistory = (params) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_HISTORY}`;
	return api.get(url, { params: params });
};

const createTreeSiteHistory = (body) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_HISTORY}`;
	return api.post(url, body);
};

const updateTreeSiteHistory = (id, body) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_HISTORY}/${id}`;
	return api.put(url, body);
};

const deleteTreeSiteHistory = (id) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_HISTORY}/${id}`;
	return api.delete(url);
};
const getTreeSiteHistoryDetail = (id) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_HISTORY}/${id}`;
	return api.get(url);
};

const treeTypeService = {
	getTreeSiteHistory,
	createTreeSiteHistory,
	deleteTreeSiteHistory,
	updateTreeSiteHistory,
	getTreeSiteHistoryDetail,
};

export default treeTypeService;

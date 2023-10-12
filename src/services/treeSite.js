import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreeSite = (params) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_SITE}`;
	return api.get(url, { params: params });
};

const getTreeSiteDetail = (params) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_SITE}/${params}`;
	return api.get(url);
};

const createTreeSite = (body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_SITE}`;
	return api.post(url, body);
};

const updateTreeSite = (id, body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_SITE}/${id}`;
	return api.put(url, body);
};

const deleteTreeSite = (id) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_SITE}/${id}`;
	return api.delete(url);
};

const treeSiteService = {
	getTreeSite,
	createTreeSite,
	deleteTreeSite,
	updateTreeSite,
	getTreeSiteDetail
};

export default treeSiteService;

import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreeType = (params) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_TYPE}`;
	return api.get(url, { params: params });
};

const createTreeType = (body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_TYPE}`;
	return api.post(url, body);
};

const updateTreeType = (id, body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_TYPE}/${id}`;
	return api.put(url, body);
};

const deleteTreeType = (id) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_TYPE}/${id}`;
	return api.delete(url);
};

const treeTypeService = {
	getTreeType,
	createTreeType,
	deleteTreeType,
	updateTreeType,
};

export default treeTypeService;

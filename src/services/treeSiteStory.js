import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreeSiteStory = (params) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_STORY}`;
	return api.get(url, { params: params });
};

const createTreeSiteStory = (body) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_STORY}`;
	return api.post(url, body);
};

const updateTreeSiteStory = (id, body) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_STORY}/${id}`;
	return api.put(url, body);
};

const deleteTreeSiteStory = (id) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_STORY}/${id}`;
	return api.delete(url);
};
const getTreeSiteStoryDetail = (id) => {
	const url = `${ApiRouters.MANAGEMENT_TREE_SITE_STORY}/${id}`;
	return api.get(url);
};

const treeTypeService = {
	getTreeSiteStory,
	createTreeSiteStory,
	deleteTreeSiteStory,
	updateTreeSiteStory,
	getTreeSiteStoryDetail,
};

export default treeTypeService;

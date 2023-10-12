import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreeJourney = (body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_JOURNEY}`;
	return api.get(url, { params: body });
};

const createTreeJourney = (body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_JOURNEY}`;
	return api.post(url, body);
};

const updateTreeJourney = (id, body) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_JOURNEY}/${id}`;
	return api.put(url, body);
};

const deleteTreeJourney = (id) => {
	const url = `${ApiRouters.MANAGEMENTS_TREE_JOURNEY}/${id}`;
	return api.delete(url);
};

const updateTreeHistory = (body) => {
	const url = `${ApiRouters.UPDATE_TREE_HISTORY}/${body.id}`;
	return api.put(url, body);
};

const treeJourneyService = {
	getTreeJourney,
	createTreeJourney,
	updateTreeJourney,
	deleteTreeJourney,
	updateTreeHistory
};

export default treeJourneyService;

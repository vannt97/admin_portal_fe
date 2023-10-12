const actions = {
	GET_TREE_SITE_HISTORY: 'GET_TREE_SITE_HISTORY',
	GET_TREE_SITE_HISTORY_SUCCESS: 'GET_TREE_SITE_HISTORY_SUCCESS',

	EXPORT_TREE_SITE_HISTORY: 'EXPORT_TREE_SITE_HISTORY',
	EXPORT_TREE_SITE_HISTORY_SUCCESS: 'EXPORT_TREE_SITE_HISTORY_SUCCESS',

	GET_TREE_SITE_HISTORY_DETAIL: 'GET_TREE_SITE_HISTORY_DETAIL',
	GET_TREE_SITE_HISTORY_DETAIL_SUCCESS: 'GET_TREE_SITE_HISTORY_DETAIL_SUCCESS',

	CREATE_TREE_SITE_HISTORY: 'CREATE_TREE_SITE_HISTORY',
	UPDATE_TREE_SITE_HISTORY: 'UPDATE_TREE_SITE_HISTORY',
	DELETE_TREE_SITE_HISTORY: 'DELETE_TREE_SITE_HISTORY',

	getTreeSiteHistory: (id) => ({
		type: actions.GET_TREE_SITE_HISTORY,
		payload: id,
	}),
	exportTreeSiteHistory: (body, cbError) => ({
		type: actions.EXPORT_TREE_SITE_HISTORY,
		body,
		cbError,
	}),

	createTreeSiteHistory: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_TREE_SITE_HISTORY,
		body,
		cbSuccess,
		cbError,
	}),

	updateTreeSiteHistory: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_TREE_SITE_HISTORY,
		id,
		body,
		cbSuccess,
		cbError,
	}),

	deleteTreeSiteHistory: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_TREE_SITE_HISTORY,
		id,
		cbSuccess,
		cbError,
	}),

	getTreeSiteHistoryDetail: (id, cbError) => ({
		type: actions.GET_TREE_SITE_HISTORY_DETAIL,
		payload: id,
		cbError,
	}),
};

export default actions;

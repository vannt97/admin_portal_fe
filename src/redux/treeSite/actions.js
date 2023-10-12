const actions = {
	GET_TREE_SITE: 'GET_TREE_SITE',
	GET_TREE_SITE_SUCCESS: 'GET_TREE_SITE_SUCCESS',
	GET_TREE_SITE_ERROR: 'GET_TREE_SITE_ERROR',

	GET_TREE_SITE_DETAIL: 'GET_TREE_SITE_DETAIL',
	GET_TREE_SITE_DETAIL_SUCCESS: 'GET_TREE_SITE_DETAIL_SUCCESS',
	GET_TREE_SITE_DETAIL_ERROR: 'GET_TREE_SITE_DETAIL_ERROR',

	EXPORT_TREE_SITE: 'EXPORT_TREE_SITE',
	EXPORT_TREE_SITE_SUCCESS: 'EXPORT_TREE_SITE_SUCCESS',

	CREATE_TREE_SITE: 'CREATE_TREE_SITE',
	UPDATE_TREE_SITE: 'UPDATE_TREE_SITE',
	DELETE_TREE_SITE: 'DELETE_TREE_SITE',

	//#region CRUD

	getTreeSite: (body) => ({
		type: actions.GET_TREE_SITE,
		body,
	}),

	exportTreeSite: (body, cbError) => ({
		type: actions.EXPORT_TREE_SITE,
		body,
		cbError,
	}),

	createTreeSite: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_TREE_SITE,
		body,
		cbSuccess,
		cbError,
	}),
	updateTreeSite: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_TREE_SITE,
		id,
		body,
		cbSuccess,
		cbError,
	}),
	deleteTreeSite: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_TREE_SITE,
		id,
		cbSuccess,
		cbError,
	}),
	getTreeSiteDetail: (id) => ({
		type: actions.GET_TREE_SITE_DETAIL,
		payload: { id },
	}),
};

export default actions;

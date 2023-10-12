const actions = {
	GET_SITE_AND_TYPE: 'GET_SITE_AND_TYPE',
	GET_SITE_AND_TYPE_SUCCESS: 'GET_SITE_AND_TYPE_SUCCESS',
	GET_TREE: 'GET_TREE',
	GET_TREE_SUCCESS: 'GET_TREE_SUCCESS',
	GET_TREE_ERROR: 'GET_TREE_ERROR',

	EXPORT_TREE: 'EXPORT_TREE',
	EXPORT_TREE_SUCCESS: 'EXPORT_TREE_SUCCESS',
	EXPORT_TREE_SHARE: 'EXPORT_TREE_SHARE',
	EXPORT_TREE_SHARE_SUCCESS: 'EXPORT_TREE_SHARE_SUCCESS',

	EXPORT_TREE_SHARE_ALL: 'EXPORT_TREE_SHARE_ALL',
	EXPORT_TREE_SHARE_ALL_SUCCESS: 'EXPORT_TREE_SHARE_ALL_SUCCESS',

	GET_TREE_DETAIL: 'GET_TREE_DETAIL',
	GET_TREE_DETAIL_SUCCESS: 'GET_TREE_DETAIL_SUCCESS',
	GET_TREE_DETAIL_ERROR: 'GET_TREE_DETAIL_ERROR',

	CREATE_TREE: 'CREATE_TREE',
	UPDATE_TREE: 'UPDATE_TREE',
	DELETE_TREE: 'DELETE_TREE',

	//#region CRUD

	getTree: (model) => ({
		type: actions.GET_TREE,
		payload: { model },
	}),

	exportTree: (body, cbError) => ({
		type: actions.EXPORT_TREE,
		body,
		cbError,
	}),

	getSiteAndType: (model) => ({
		type: actions.GET_SITE_AND_TYPE,
		payload: { model },
	}),

	createTree: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_TREE,
		body,
		cbSuccess,
		cbError,
	}),

	updateTree: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_TREE,
		id, body,
		cbSuccess,
		cbError,
	}),

	deleteTree: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_TREE,
		id,
		cbSuccess,
		cbError,
	}),

	getTreeDetail: (id, cbError) => ({
		type: actions.GET_TREE_DETAIL,
		id,
		cbError,
	}),

	getTreeShare: (params, cbSuccess, cbError) => ({
		type: actions.EXPORT_TREE_SHARE,
		params,
		cbSuccess,
		cbError,
	}),

	getTreeShareAll: (params, cbSuccess, cbError) => ({
		type: actions.EXPORT_TREE_SHARE_ALL,
		params,
		cbSuccess,
		cbError,
	}),

};

export default actions;

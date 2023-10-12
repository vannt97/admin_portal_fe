const actions = {
	GET_TREE_TYPE: 'GET_TREE_TYPE',
	GET_TREE_TYPE_SUCCESS: 'GET_TREE_TYPE_SUCCESS',
	GET_TREE_TYPE_ERROR: 'GET_TREE_TYPE_ERROR',

	EXPORT_TREE_TYPE: 'EXPORT_TREE_TYPE',
	EXPORT_TREE_TYPE_SUCCESS: 'EXPORT_TREE_TYPE_SUCCESS',

	GET_TREE_TYPE_DETAIL: 'GET_TREE_TYPE_DETAIL',
	GET_TREE_TYPE_DETAIL_SUCCESS: 'GET_TREE_TYPE_DETAIL_SUCCESS',
	GET_TREE_TYPE_DETAIL_ERROR: 'GET_TREE_TYPE_DETAIL_ERROR',

	CREATE_TREE_TYPE: 'CREATE_TREE_TYPE',
	UPDATE_TREE_TYPE: 'UPDATE_TREE_TYPE',
	DELETE_TREE_TYPE: 'DELETE_TREE_TYPE',

	//#region CRUD

	getTreeType: (body) => ({
		type: actions.GET_TREE_TYPE,
		body,
	}),

	createTreeType: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_TREE_TYPE,
		body,
		cbSuccess,
		cbError,
	}),

	exportTreeType: (body, cbError) => ({
		type: actions.EXPORT_TREE_TYPE,
		body,
		cbError,
	}),

	updateTreeType: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_TREE_TYPE,
		id,
		body,
		cbSuccess,
		cbError,
	}),

	deleteTreeType: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_TREE_TYPE,
		id,
		cbSuccess,
		cbError,
	}),
	getTreeTypeDetail: (id) => ({
		type: actions.GET_TREE_TYPE_DETAIL,
		payload: { id },
	}),
};

export default actions;

const actions = {
	GET_PG: 'GET_PG',
	GET_PG_SUCCESS: 'GET_PG_SUCCESS',
	GET_PG_ERROR: 'GET_PG_ERROR',

	GET_PG_DETAIL: 'GET_PG_DETAIL',
	GET_PG_DETAIL_SUCCESS: 'GET_PG_DETAIL_SUCCESS',
	GET_PG_DETAIL_ERROR: 'GET_PG_DETAIL_ERROR',

	EXPORT_PG: 'EXPORT_PG',
	IMPORT_PG: 'IMPORT_PG',
	EXPORT_PG_SUCCESS: 'EXPORT_PG_SUCCESS',

	CREATE_PG: 'CREATE_PG',
	UPDATE_PG: 'UPDATE_PG',
	DELETE_PG: 'DELETE_PG',

	//#region CRUD

	getPG: (body) => ({
		type: actions.GET_PG,
		body,
	}),

	exportPG: (body, exportType, cbSuccess, cbError) => ({
		type: actions.EXPORT_PG,
		body,
		exportType,
		cbSuccess,
		cbError,
	}),

	createPG: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_PG,
		body,
		cbSuccess,
		cbError,
	}),

	importPG: (body, cbSuccess, cbError) => ({
		type: actions.IMPORT_PG,
		body,
		cbSuccess,
		cbError,
	}),

	updatePG: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_PG,
		id,
		body,
		cbSuccess,
		cbError,
	}),
	deletePG: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_PG,
		id,
		cbSuccess,
		cbError,
	}),
	getPGDetail: (id) => ({
		type: actions.GET_PG_DETAIL,
		payload: { id },
	}),
};

export default actions;

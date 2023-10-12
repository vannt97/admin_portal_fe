const actions = {
	GET_GREEN_NEWS: 'GET_GREEN_NEWS',
	GET_GREEN_NEWS_SUCCESS: 'GET_GREEN_NEWS_SUCCESS',
	GET_GREEN_NEWS_ERROR: 'GET_GREEN_NEWS_ERROR',

	EXPORT_GREEN_NEWS: 'EXPORT_GREEN_NEWS',
	EXPORT_GREEN_NEWS_SUCCESS: 'EXPORT_GREEN_NEWS_SUCCESS',

	GET_GREEN_NEWS_DETAIL: 'GET_GREEN_NEWS_DETAIL',
	GET_GREEN_NEWS_DETAIL_SUCCESS: 'GET_GREEN_NEWS_DETAIL_SUCCESS',
	GET_GREEN_NEWS_DETAIL_ERROR: 'GET_GREEN_NEWS_DETAIL_ERROR',

	CREATE_GREEN_NEWS: 'CREATE_GREEN_NEWS',
	UPDATE_GREEN_NEWS: 'UPDATE_GREEN_NEWS',
	DELETE_GREEN_NEWS: 'DELETE_GREEN_NEWS',

	//#region CRUD

	getGreenNews: (body) => ({
		type: actions.GET_GREEN_NEWS,
		body,
	}),

	exportGreenNews: (body, cbError) => ({
		type: actions.EXPORT_GREEN_NEWS,
		body,
		cbError,
	}),

	createGreenNews: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_GREEN_NEWS,
		body,
		cbSuccess,
		cbError,
	}),
	updateGreenNews: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_GREEN_NEWS,
		id,
		body,
		cbSuccess,
		cbError,
	}),
	deleteGreenNews: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_GREEN_NEWS,
		id,
		cbSuccess,
		cbError,
	}),
	getGreenNewsDetail: (id) => ({
		type: actions.DELETE_GREEN_NEWS,
		payload: { id },
	}),
};

export default actions;

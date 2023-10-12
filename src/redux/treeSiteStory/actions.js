const actions = {
	GET_TREE_SITE_STORY: 'GET_TREE_SITE_STORY',
	GET_TREE_SITE_STORY_SUCCESS: 'GET_TREE_SITE_STORY_SUCCESS',

	GET_TREE_SITE_STORY_DETAIL: 'GET_TREE_SITE_STORY_DETAIL',
	GET_TREE_SITE_STORY_DETAIL_SUCCESS: 'GET_TREE_SITE_STORY_DETAIL_SUCCESS',

	EXPORT_TREE_SITE_STORY: 'EXPORT_TREE_SITE_STORY',
	EXPORT_TREE_SITE_STORY_SUCCESS: 'EXPORT_TREE_SITE_STORY_SUCCESS',

	CREATE_TREE_SITE_STORY: 'CREATE_TREE_SITE_STORY',
	UPDATE_TREE_SITE_STORY: 'UPDATE_TREE_SITE_STORY',
	DELETE_TREE_SITE_STORY: 'DELETE_TREE_SITE_STORY',

	getTreeSiteStory: (id) => ({
		type: actions.GET_TREE_SITE_STORY,
		payload: id,
	}),

	exportTreeSiteStory: (id, cbError) => ({
		type: actions.EXPORT_TREE_SITE_STORY,
		id,
		cbError,
	}),

	createTreeSiteStory: (body, cbSuccess, cbError) => ({
		type: actions.CREATE_TREE_SITE_STORY,
		body,
		cbSuccess,
		cbError,
	}),

	updateTreeSiteStory: (id, body, cbSuccess, cbError) => ({
		type: actions.UPDATE_TREE_SITE_STORY,
		id,
		body,
		cbSuccess,
		cbError,
	}),

	deleteTreeSiteStory: (id, cbSuccess, cbError) => ({
		type: actions.DELETE_TREE_SITE_STORY,
		id,
		cbSuccess,
		cbError,
	}),

	getTreeSiteStoryDetail: (id, cbError) => ({
		type: actions.GET_TREE_SITE_STORY_DETAIL,
		payload: id,
		cbError,
	}),
};

export default actions;

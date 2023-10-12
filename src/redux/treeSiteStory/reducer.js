import actions from './actions';

const initState = {
	treesSiteStory: [],
	treeSiteStoryDetail: {},
	dataExportTreeSiteStory: [],
	loading: false,
};

export default function treeSiteStoryReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_SITE_STORY_SUCCESS:
			return { ...state, loading: false, treesSiteStory: action.payload };
		case actions.GET_TREE_SITE_STORY_DETAIL_SUCCESS:
			return { ...state, loading: false, treeSiteStoryDetail: action.payload.data };
		case actions.EXPORT_TREE_SITE_STORY_SUCCESS:
			return { ...state, loading: false,  dataExportTreeSiteStory: action.payload };
		default:
			return state;
	}
}

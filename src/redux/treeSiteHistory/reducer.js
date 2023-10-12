import actions from './actions';

const initState = {
	treesSiteHistory: [],
	treeSiteHistoryDetail: {},
	dataExportTreeSiteHistory: [],
};

export default function treeSiteHistoryReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_SITE_HISTORY_SUCCESS:
			return { ...state, loading: false, treesSiteHistory: action.payload };
		case actions.GET_TREE_SITE_HISTORY_DETAIL_SUCCESS:
			return { ...state, loading: false, treeSiteHistoryDetail: action.payload.data };
		case actions.EXPORT_TREE_SITE_HISTORY_SUCCESS:
			return { ...state, loading: false, dataExportTreeSiteHistory: action.payload };
		default:
			return state;
	}
}

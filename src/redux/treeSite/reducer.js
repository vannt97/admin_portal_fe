import actions from './actions';

const initState = {
	treeSites: [],
	treeSiteDetail: {},
	dataExportTreeSites: [],
	loading: false,
};

export default function treeSiteReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_SITE_SUCCESS:
			return { ...state, loading: false, treeSites: action.payload };
		case actions.GET_TREE_SITE_DETAIL_SUCCESS:
			return { ...state, loading: false, treeSiteDetail: action.payload?.data };
		case actions.EXPORT_TREE_SITE_SUCCESS:
			return { ...state, loading: false, dataExportTreeSites: action.payload };
		default:
			return state;
	}
}

import actions from './actions';

const initState = {
	trees: [],
	treeDetail: {},
	dataExportTrees: [],
	dataExportTreesAll: [],
	typeAndSite: {},
	loading: false,
};

export default function treeReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_SUCCESS:
			return { ...state, loading: false, trees: action.payload };
		case actions.GET_SITE_AND_TYPE_SUCCESS:
			return { ...state, loading: false, typeAndSite: action.payload.data };
		case actions.GET_TREE_DETAIL_SUCCESS:
			return { ...state, treeDetail: action.payload, loading: false };
		case actions.EXPORT_TREE_SUCCESS:
			return { ...state, loading: false, dataExportTrees: action.payload };
		case actions.EXPORT_TREE_SHARE_ALL_SUCCESS:
			return { ...state, loading: false, dataExportTreesAll: action.payload };
		default:
			return state;
	}
}

import actions from './actions';

const initState = {
	treeTypes: [],
	treeTypeDetail: {},
	dataExportTreeType: [],
	loading: false,
};

export default function treeSiteReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_TYPE_SUCCESS:
			return { ...state, loading: false, treeTypes: action.payload };
		case actions.GET_TREE_TYPE_DETAIL_SUCCESS:
			return { ...state, loading: false, treeTypeDetail: action.payload };
		case actions.EXPORT_TREE_TYPE_SUCCESS:
			return { ...state, loading: false, dataExportTreeType: action.payload };
		default:
			return state;
	}
}

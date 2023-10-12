import actions from './actions';

const initState = {
	treeJourneys: [],
	treeJourneyDetail: {},
	dataExportTreeJourney: [],
	loading: false,
};

export default function treeJourneyReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_TREE_JOURNEY_SUCCESS:
			return { ...state, loading: false, treeJourneys: action.payload };
		case actions.GET_TREE_JOURNEY_DETAIL_SUCCESS:
			return { ...state, loading: false, treeJourneyDetail: action.payload };
		case actions.EXPORT_TREE_JOURNEY_SUCCESS:
			return { ...state, loading: false, dataExportTreeJourney: action.payload };
		default:
			return state;
	}
}

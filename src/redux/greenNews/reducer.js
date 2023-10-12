import actions from './actions';

const initState = {
	greenNews: [],
	exportGreenNews: [],
	greenNewsDetail: {},
	loading: false,
};

export default function greenNewsReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_GREEN_NEWS_SUCCESS:
			return { ...state, loading: false, greenNews: action.payload };
		case actions.GET_GREEN_NEWS_DETAIL_SUCCESS:
			return { ...state, loading: false, greenNewsDetail: action.payload };
		case actions.EXPORT_GREEN_NEWS_SUCCESS:
			return { ...state, exportGreenNews: action.payload };
		default:
			return state;
	}
}

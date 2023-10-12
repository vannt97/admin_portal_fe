import actions from './actions';

const initState = {
	staticImages: [],
	staticImageTrialPortal: {},
	imgParnersPortal: {},
	loading: false,
};

export default function staticImageTrialReducer(state = initState, action) {
	switch (action.type) {
		//#region CRUD
		case actions.GET_STATIC_IMAGE_TRIAL_PORTAL_SUCCESS:
			return { ...state, loading: false, staticImageTrialPortal: action.payload };

		case actions.GET_IMG_PARTNERS_PORTAL_SUCCESS:
			return { ...state, loading: false, imgParnersPortal: action.payload };
		default:
			return state;
	}
}

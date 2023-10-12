import actions from './actions';

const initState = {
    videos: [],
    videoDetail: {},
    dataExportVideo: [],
    loading: false,
};

export default function treeSiteReducer(state = initState, action) {
    switch (action.type) {
        //#region CRUD
        case actions.GET_VIDEO_SUCCESS:
            return { ...state, loading: false, videos: action.payload };
        case actions.GET_VIDEO_DETAIL_SUCCESS:
            return { ...state, loading: false, videoDetail: action.payload.data };
        case actions.EXPORT_VIDEO_SUCCESS:
            return { ...state, loading: false, dataExportVideo: action.payload };
        default:
            return state;
    }
}

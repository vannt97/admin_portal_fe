import actions from './actions';

const initState = {
    dataGetQna: {},
    dataGetQnaDetail: null,
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_QNA_SUCCESS: {
            return { ...state, dataGetQna: action.payload.data };
        }

        case actions.GET_QNA_DETAIL_SUCCESS: {
            return { ...state, dataGetQnaDetail: action.payload };
        }

        case actions.LOADING_FALSE: {
            return { ...state, loading: false };
        }

        default:
            return state;
    }
}

import actions from './actions';

const initState = {
  treePGHistory: [],
};

export default function treePGHistoryReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_TREE_PG_HISTORY_SUCCESS:
      return { ...state, loading: false, treePGHistory: action.payload };
    default:
      return state;
  }
}

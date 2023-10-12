import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getTreePGHistory = (body) => {
  const url = `${ApiRouters.GET_TREE_PG_HISTORY}`;
  return api.get(url, { params: body });
};

const TreePGHistoryService = {
  getTreePGHistory,
};

export default TreePGHistoryService;

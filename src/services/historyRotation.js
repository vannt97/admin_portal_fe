import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getHistoryRotation = (body) => {
    const url = `${ApiRouters.MANAGE_HISTORY_ROTATION}`;
    return api.get(url, { params: body });
};

const greenNewsService = {
    getHistoryRotation,
};

export default greenNewsService;

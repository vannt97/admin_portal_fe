import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getVideo = (params) => {
    const url = `${ApiRouters.VIDEO}`;
    return api.get(url, { params: params });
};

const getVideoDetail = (params) => {
    const url = `${ApiRouters.VIDEO}/${params}`;
    return api.get(url);
};

const createVideo = (body) => {
    const url = `${ApiRouters.VIDEO}`;
    return api.post(url, body);
};

const updateVideo = (id, body) => {
    const url = `${ApiRouters.VIDEO}/${id}`;
    return api.put(url, body);
};

const deleteVideo = (id) => {
    const url = `${ApiRouters.VIDEO}/${id}`;
    return api.delete(url);
};

const videoService = {
    getVideo,
    createVideo,
    deleteVideo,
    updateVideo,
    getVideoDetail
};

export default videoService;

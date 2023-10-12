import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getGift = (params) => {
    const url = `${ApiRouters.MANAGEMENT_GIFT}`;
    return api.get(url, { params: params });
};

const getGiftDetail = (params) => {
    const url = `${ApiRouters.MANAGEMENT_GIFT}/${params.id}`;
    return api.get(url);
};

const createGift = (body) => {
    const url = `${ApiRouters.MANAGEMENT_GIFT}`;
    return api.post(url, body);
};

const updateGift = (id, body) => {
    const url = `${ApiRouters.MANAGEMENT_GIFT}/${id}`;
    return api.put(url, body);
};

const deleteGift = (id) => {
    const url = `${ApiRouters.MANAGEMENT_GIFT}/${id}`;
    return api.delete(url);
};

const giftService = {
    getGift,
    createGift,
    deleteGift,
    updateGift,
    getGiftDetail
};

export default giftService;

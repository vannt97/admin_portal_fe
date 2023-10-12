import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getCampaign = (params) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}`;
    return api.get(url, { params: params });
};

const getCampaignDetail = (params) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/${params.id}`;
    return api.get(url);
};

const createCampaign = (body) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}`;
    return api.post(url, body);
};

const updateCampaign = (id, body) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/${id}`;
    return api.put(url, body);
};

const deleteCampaign = (id) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/${id}`;
    return api.delete(url);
};

const campaignService = {
    getCampaign,
    createCampaign,
    deleteCampaign,
    updateCampaign,
    getCampaignDetail
};

export default campaignService;

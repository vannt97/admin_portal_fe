import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getCampaignDuration = (params) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/${params.id}/CampaignDuration`;
    return api.get(url, { params: params });
};

const getCampaignDurationDetail = (params) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/CampaignDuration/${params.id}`;
    return api.get(url);
};

const createCampaignDuration = ({ id }, body) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/${id}/CampaignDuration`;
    return api.post(url, body);
};

const updateCampaignDuration = (id, body) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/CampaignDuration/${id}`;
    return api.put(url, body);
};

const deleteCampaignDuration = (id) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/CampaignDuration/${id}`;
    return api.delete(url);
};
const createCampaignDurationGift = (body) => {
    const url = `${ApiRouters.MANAGEMENT_CAMPAIGN}/CampaignDuration/Gift`;
    return api.post(url, body);
};

const campaignDurationService = {
    getCampaignDuration,
    createCampaignDuration,
    deleteCampaignDuration,
    updateCampaignDuration,
    getCampaignDurationDetail,
    createCampaignDurationGift
};

export default campaignDurationService;

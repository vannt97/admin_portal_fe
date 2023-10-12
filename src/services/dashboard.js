import { api } from "@iso/utils/axios.configs";
import { ApiRouters } from "@iso/utils/apiRouters";

export const getStatistics = body => {
    var url = ApiRouters.DASHBOARD;
    return api.get(url, { params: { type: body } });
};

export const getDashboard = body => {
    var url = ApiRouters.DASHBOARD_BO;
    return api.get(url);
};
import { api } from "@iso/utils/axios.configs";
import { ApiRouters } from "@iso/utils/apiRouters";

export const getSubscriptionRequests = body => {
    var url = ApiRouters.SUBSCRIPTIONREQUEST;
    return api.get(url, { params: body });
  };

  export const getSubscriptionTeacherRequests = body => {
    var url = ApiRouters.SUBSCRIPTIONTEACHERREQUEST;
    return api.get(url, { params: body });
  };
import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getQuestionGroup = (params) => {
    const url = `${ApiRouters.MANAGEMENT_QUESTION_GROUP}`+ '/Search';
    return api.get(url, { params: params });
};

const getQuestionGroupDetail = (id) => {
    const url = `${ApiRouters.MANAGEMENT_QUESTION_GROUP}/Detail/${id}`;
    return api.get(url);
};

const updateQuestionGroup = (id, body) => {
    const url = `${ApiRouters.MANAGEMENT_QUESTION_GROUP}/Edit/${id}`;
    console.log({url: url})
    return api.post(url,body);
};


const questionGroupService = {
    getQuestionGroup ,
    getQuestionGroupDetail,
    updateQuestionGroup
};

export default questionGroupService;

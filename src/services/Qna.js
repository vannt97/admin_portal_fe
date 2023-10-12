import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

export const getQna = params => {
    const url = ApiRouters.GET_QNA;
    return api.get(url, { params });
};

export const getQnaDetail = (id, params) => {
    const url = `${ApiRouters.GET_QNA_DETAIL}/${id}`;
    return api.get(url, { params });
};

export const deleteQna = (id) => {
    const url = `${ApiRouters.DELETE_QNA}/${id}`;
    return api.delete(url, { id });
};

export const postQna = (model) => {
    const url = `${ApiRouters.POST_QNA}`;
    return api.post(url, model);
};

export const putQna = (model) => {
    const { id } = model;
    const url = `${ApiRouters.PUT_QNA}/${id}`;
    return api.put(url, model);
};

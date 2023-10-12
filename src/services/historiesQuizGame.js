import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '../utils/apiRouters';

const getHistoriesQuizGame = (params) => {
    const url = `${ApiRouters.MANAGEMENT_QUESTION_GROUP}`+ '/Histories/QuizGame';
    return api.get(url, { params: params });
};

const historiesQuizGameService = {
    getHistoriesQuizGame
};

export default historiesQuizGameService;

import actions from './actions';
import learnerAction from '../learners/actions';

const initState = {
    groups: [],
    profileTypes: [],
    nations: [],
    provinces: [],
    districts: [],
    wards: [],
    topics: [],
    careers: [],
    signalTypes: [],
    profileAvatar: null,
    subcriptionPackages: [],
    subcriptionPackagesWithTrial: [],
    subscriptionTypes: [],
    versionApi: "0",
    loading: false,
};

export default function accountReducer(state = initState, action) {
    switch (action.type) {

        case actions.GET_VERSION_API_SUCCESS: {
            return { ...state, versionApi: action.payload.data };
        }

        case learnerAction.GET_LEARNER_DETAIL: {
            return { ...state, provinces: [], districts: [], wards: [] };
        }

        //#region GROUP
        case actions.GET_GROUPS_COMMON:
            return { ...state };
        case actions.GET_GROUPS_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, groups: res };
        }
        //#endregion
        //#region PROFILE TYPES
        case actions.GET_PROFILE_TYPES_COMMON:
            return { ...state };
        case actions.GET_PROFILE_TYPES_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, profileTypes: res };
        }

        //#region ADDRESS
        case actions.GET_NATION_COMMON:
            return { ...state };
        case actions.GET_NATION_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, nations: res };
        }

        case actions.GET_PROVINCE_COMMON:
            return { ...state, provinces: [] };
        case actions.GET_PROVINCE_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, provinces: res };
        }
        case actions.RESET_PROVINCE_COMMON:
            return { ...state, provinces: [] };

        case actions.GET_DISTRICT_COMMON:
            return { ...state, districts: [] };
        case actions.GET_DISTRICT_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, districts: res };
        }
        case actions.RESET_DISTRICT_COMMON:
            return { ...state, districts: [] };

        case actions.GET_WARD_COMMON:
            return { ...state };
        case actions.GET_WARD_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, wards: res };
        }
        case actions.RESET_WARD_COMMON:
            return { ...state, wards: [] };
        //#endregion

        //#region TOPIC
        case actions.GET_TOPICS_COMMON:
            return { ...state };
        case actions.GET_TOPICS_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, topics: res };
        }
        //#endregion

        //#region CAREER
        case actions.GET_CAREERS_COMMON:
            return { ...state };
        case actions.GET_CAREERS_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, careers: res };
        }
        //#endregion

        //#region SUBCRIPTIONPACKAGE
        case actions.GET_SUBCRIPTIONPACKAGES_COMMON:
            return { ...state };
        case actions.GET_SUBCRIPTIONPACKAGES_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, subcriptionPackages: res };
        }

        //#region SUBCRIPTIONPACKAGEBYROLE
        case actions.GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE:
            return { ...state };
        case actions.GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, subcriptionPackages: res };
        }

        case actions.GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON:
            return { ...state };
        case actions.GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, subcriptionPackagesWithTrial: res };
        }
        //#endregion

        //#region GENDERS
        case actions.GET_GENDERS_COMMON:
            return { ...state };
        case actions.GET_GENDERS_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, genders: res };
        }
        //#endregion

        //#region SIGNALTYPES
        case actions.GET_SIGNALTYPES_COMMON:
            return { ...state };
        case actions.GET_SIGNALTYPES_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, signalTypes: res };
        }
        //#endregion

        //#region LANGUAGES
        case actions.GET_LANGUAGES_COMMON:
            return { ...state };
        case actions.GET_LANGUAGES_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, languages: res };
        }
        //#endregion

        //#region PROFILE AVATAR
        case actions.GET_PROFILE_AVATAR_COMMON:
            return { ...state };
        case actions.GET_PROFILE_AVATAR_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : null;
            return { ...state, profileAvatar: res };
        }
        //#endregion

        //#region SUBSCRIPTION TYPES
        case actions.GET_SUBSCRIPTION_TYPES_COMMON:
            return { ...state };
        case actions.GET_SUBSCRIPTION_TYPES_COMMON_SUCCESS: {
            let { data } = action.payload;
            let res = data ? data : [];
            return { ...state, subscriptionTypes: res };
        }
        //#endregion

        case actions.COMMON_RESPONSE_ERROR:
            return { ...state, loading: false }

        default:
            return state;

    }
}

const actions = {

    //#region VERSION
    GET_VERSION_API: 'GET_VERSION_API',
    GET_VERSION_API_SUCCESS: 'GET_VERSION_API_SUCCESS',
    GET_VERSION_API_ERROR: 'GET_VERSION_API_ERROR',

    getVersionApi: () => ({
        type: actions.GET_VERSION_API,
    }),
    //#endregion

    //#region GROUPS
    GET_GROUPS_COMMON: 'GET_GROUPS_COMMON',
    GET_GROUPS_COMMON_SUCCESS: 'GET_GROUPS_COMMON_SUCCESS',
    getGroupsCommon: () => ({
        type: actions.GET_GROUPS_COMMON,
    }),
    //#endregion

    //#region GROUPS
    GET_PROFILE_TYPES_COMMON: 'GET_PROFILE_TYPES_COMMON',
    GET_PROFILE_TYPES_COMMON_SUCCESS: 'GET_PROFILE_TYPES_COMMON_SUCCESS',
    getProfileTypesCommon: () => ({
        type: actions.GET_PROFILE_TYPES_COMMON,
    }),
    //#endregion

    //#region  ADDRESS
    GET_NATION_COMMON: 'GET_NATION_COMMON',
    GET_NATION_COMMON_SUCCESS: 'GET_NATION_COMMON_SUCCESS',
    getNations: () => ({
        type: actions.GET_NATION_COMMON,
    }),

    GET_PROVINCE_COMMON: 'GET_PROVINCE_COMMON',
    GET_PROVINCE_COMMON_SUCCESS: 'GET_PROVINCE_COMMON_SUCCESS',
    RESET_PROVINCE_COMMON: 'RESET_PROVINCE_COMMON',
    getProvinces: nationId => ({
        type: actions.GET_PROVINCE_COMMON,
        payload: { nationId }
    }),
    resetProvinces: () => ({
        type: actions.RESET_PROVINCE_COMMON,
    }),

    GET_DISTRICT_COMMON: 'GET_DISTRICT_COMMON',
    GET_DISTRICT_COMMON_SUCCESS: 'GET_DISTRICT_COMMON_SUCCESS',
    RESET_DISTRICT_COMMON: 'RESET_DISTRICT_COMMON',
    getDistricts: provinceId => ({
        type: actions.GET_DISTRICT_COMMON,
        payload: { provinceId }
    }),
    resetDistricts: () => ({
        type: actions.RESET_DISTRICT_COMMON,
    }),

    GET_WARD_COMMON: 'GET_WARD_COMMON',
    GET_WARD_COMMON_SUCCESS: 'GET_WARD_COMMON_SUCCESS',
    RESET_WARD_COMMON: 'RESET_WARD_COMMON',
    getWards: districtId => ({
        type: actions.GET_WARD_COMMON,
        payload: { districtId }
    }),
    resetWards: () => ({
        type: actions.RESET_WARD_COMMON,
    }),
    //#endregion

    //#region  TOPIC
    GET_TOPICS_COMMON: 'GET_TOPICS_COMMON',
    GET_TOPICS_COMMON_SUCCESS: 'GET_TOPICS_COMMON_SUCCESS',
    getTopicsSelectList: model => ({
        type: actions.GET_TOPICS_COMMON,
        payload: { model }
    }),
    //#endregion

    //#region  CAREER
    GET_CAREERS_COMMON: 'GET_CAREERS_COMMON',
    GET_CAREERS_COMMON_SUCCESS: 'GET_CAREERS_COMMON_SUCCESS',
    getCareersSelectList: () => ({
        type: actions.GET_CAREERS_COMMON,
    }),
    //#endregion

    //#region  SUBCRIPTIONPACKAGE
    GET_SUBCRIPTIONPACKAGES_COMMON: 'GET_SUBCRIPTIONPACKAGES_COMMON',
    GET_SUBCRIPTIONPACKAGES_COMMON_SUCCESS: 'GET_SUBCRIPTIONPACKAGES_COMMON_SUCCESS',
    getSubcriptionPackagesSelectList: () => ({
        type: actions.GET_SUBCRIPTIONPACKAGES_COMMON,
    }),

    //#region  SUBCRIPTIONPACKAGEBYROLE
    GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE: 'GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE',
    GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE_SUCCESS: 'GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE_SUCCESS',
    getSubcriptionPackagesSelectListByRole: model => ({
        type: actions.GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE,
        payload: { model }
    }),

    GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON: 'GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON',
    GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON_SUCCESS: 'GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON_SUCCESS',
    getSubcriptionPackagesSelectListWithTrial: () => ({
        type: actions.GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON,
    }),
    //#endregion

    //#region Gender
    GET_GENDERS_COMMON: 'GET_GENDERS_COMMON',
    GET_GENDERS_COMMON_SUCCESS: 'GET_GENDERS_COMMON_SUCCESS',
    getGendersCommon: () => ({
        type: actions.GET_GENDERS_COMMON,
    }),
    //#endregion

    //#region Signal types
    GET_SIGNALTYPES_COMMON: 'GET_SIGNALTYPES_COMMON',
    GET_SIGNALTYPES_COMMON_SUCCESS: 'GET_SIGNALTYPES_COMMON_SUCCESS',
    getSignalTypesCommon: () => ({
        type: actions.GET_SIGNALTYPES_COMMON,
    }),
    //#endregion

    //#region Language
    GET_LANGUAGES_COMMON: 'GET_LANGUAGES_COMMON',
    GET_LANGUAGES_COMMON_SUCCESS: 'GET_LANGUAGES_COMMON_SUCCESS',
    getLanguagesCommon: () => ({
        type: actions.GET_LANGUAGES_COMMON,
    }),
    //#endregion

    //#region Language
    GET_PROFILE_AVATAR_COMMON: 'GET_PROFILE_AVATAR_COMMON',
    GET_PROFILE_AVATAR_COMMON_SUCCESS: 'GET_PROFILE_AVATAR_COMMON_SUCCESS',
    getProfileAvatarCommon: () => ({
        type: actions.GET_PROFILE_AVATAR_COMMON,
    }),

    //#region SUBSCRIPTION TYPES
    GET_SUBSCRIPTION_TYPES_COMMON: 'GET_SUBSCRIPTION_TYPES_COMMON',
    GET_SUBSCRIPTION_TYPES_COMMON_SUCCESS: 'GET_SUBSCRIPTION_TYPES_COMMON_SUCCESS',
    getSubscriptionTypesCommon: () => ({
        type: actions.GET_SUBSCRIPTION_TYPES_COMMON,
    }),
    //#endregion

    //#endregion
    COMMON_RESPONSE_ERROR: 'COMMON_RESPONSE_ERROR'

    
}

export default actions;
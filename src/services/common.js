import { api } from '@iso/utils/axios.configs';
import { ApiRouters } from '@iso/utils/apiRouters';

export const getVersionApi = () => {
    var url = `${ApiRouters.COMMON}/GetVersionApi`;
    return api.get(url);
};

//#region GROUPS 
export const getGroupsCommon = () => {
    var url = `${ApiRouters.COMMON}/Groups`;
    return api.get(url);
};
//#endregion

//#region PROFILE TYPES 
export const getProfileTypesCommon = () => {
    var url = `${ApiRouters.COMMON}/ProfileTypes`;
    return api.get(url);
};
//#endregion

//#region ADDRESS 
export const getNations = () => {
    var url = `${ApiRouters.COMMON}/Nations`;
    return api.get(url);
};
export const getProvinces = (nationId) => {
    var url = `${ApiRouters.COMMON}/Nations/${nationId}/Provinces`;
    return api.get(url);
};
export const getDistricts = provinceId => {
    var url = `${ApiRouters.COMMON}/Provinces/${provinceId}/Districts`;
    return api.get(url);
};
export const getWards = districtId => {
    var url = `${ApiRouters.COMMON}/Districts/${districtId}/Wards`;
    return api.get(url);
};
//#endregion
//#region Select list
export const getTopicSelectList = model => {
    var url = `${ApiRouters.COMMON}/Topics`;
    return api.get(url, { params: model });
};
export const getCareerSelectList = () => {
    var url = `${ApiRouters.COMMON}/Careers`;
    return api.get(url);
};
export const getSubcriptionPackageSelectList = () => {
    var url = `${ApiRouters.COMMON}/SubcriptionPackages`;
    return api.get(url);
};
export const getSubcriptionPackageSelectListByRole = params => {
    var url = `${ApiRouters.COMMON}/SubcriptionPackagesByRole`;
    return api.get(url, { params });
  };
export const getSubcriptionPackageSelectListWithTrial = () => {
    var url = `${ApiRouters.COMMON}/SubcriptionPackagesWithTrial`;
    return api.get(url);
};
//#region 

//#region Other
export const getGendersCommon = () => {
    var url = `${ApiRouters.COMMON}/Genders`;
    return api.get(url);
};
export const getLanguagesCommon = () => {
    var url = `${ApiRouters.COMMON}/Languages`;
    return api.get(url);
};
export const getSignalTypesCommon = () => {
    var url = `${ApiRouters.COMMON}/SignalTypes`;
    return api.get(url);
};
//#endregion

//#region 
export const getProfileAvatarCommon = () => {
    var url = `${ApiRouters.COMMON}/UserProfileAvatar`;
    return api.get(url);
};
//#endregion

//#region SUBSCRIPTION TYPES
export const getSubscriptionTypesCommon = () => {
    var url = `${ApiRouters.COMMON}/SubcriptionTypes`;
    return api.get(url);
};
//#endregion

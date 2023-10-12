import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as commonServices from '@iso/services/common';

//#region VERSION
export function* getVersionApi() {
    yield takeEvery(actions.GET_VERSION_API, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getVersionApi);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_VERSION_API_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.GET_VERSION_API_ERROR, })
        }
    })
}
//#endregion

//#region GROUP
export function* getGroupsCommon() {
    yield takeEvery(actions.GET_GROUPS_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getGroupsCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_GROUPS_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region GROUP
export function* getProfileTypesCommon() {
    yield takeEvery(actions.GET_PROFILE_TYPES_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getProfileTypesCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_PROFILE_TYPES_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region ADDRESS
export function* getNations() {
    yield takeEvery(actions.GET_NATION_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getNations);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_NATION_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
export function* getProvinces() {
    yield takeEvery(actions.GET_PROVINCE_COMMON, function* ({ payload }) {
        const { nationId } = payload;
        try {
            var response = yield call(commonServices.getProvinces, nationId);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_PROVINCE_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
export function* getDistricts() {
    yield takeEvery(actions.GET_DISTRICT_COMMON, function* ({ payload }) {
        const { provinceId } = payload;
        try {
            if (provinceId === null) {
                yield put({
                    type: actions.GET_DISTRICT_COMMON_SUCCESS,
                    payload: { data: [] }
                })
                return;
            }
            var response = yield call(commonServices.getDistricts, provinceId);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_DISTRICT_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
export function* getWards() {
    yield takeEvery(actions.GET_WARD_COMMON, function* ({ payload }) {
        const { districtId } = payload;
        try {
            var response = yield call(commonServices.getWards, districtId);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_WARD_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}

//#endregion

//#region TOPIC
export function* getTopicsCommon() {
    yield takeEvery(actions.GET_TOPICS_COMMON, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(commonServices.getTopicSelectList, model);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_TOPICS_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region CAREER
export function* getCareersCommon() {
    yield takeEvery(actions.GET_CAREERS_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getCareerSelectList);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_CAREERS_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region SUBCRIPTIONPACKAGE
export function* getSubcriptionPackagesCommon() {
    yield takeEvery(actions.GET_SUBCRIPTIONPACKAGES_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getSubcriptionPackageSelectList);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_SUBCRIPTIONPACKAGES_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}

//#region SUBCRIPTIONPACKAGE
export function* getSubcriptionPackagesByRoleCommon() {
    yield takeEvery(actions.GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(commonServices.getSubcriptionPackageSelectListByRole, model);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_SUBCRIPTIONPACKAGES_COMMON_BY_ROLE_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}

export function* getSubcriptionPackagesWithTrialCommon() {
    yield takeEvery(actions.GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getSubcriptionPackageSelectListWithTrial);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_SUBCRIPTIONPACKAGES_WITHTRIAL_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region GENDER
export function* getGendersCommon() {
    yield takeEvery(actions.GET_GENDERS_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getGendersCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_GENDERS_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}

//#region SIGNALTYPE
export function* getSignalTypesCommon() {
    yield takeEvery(actions.GET_SIGNALTYPES_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getSignalTypesCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_SIGNALTYPES_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}

//#endregion

//#region LANGUAGE
export function* getLanguagesCommon() {
    yield takeEvery(actions.GET_LANGUAGES_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getLanguagesCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_LANGUAGES_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region PROFILE AVATAR
export function* getProfileAvatarCommon() {
    yield takeEvery(actions.GET_PROFILE_AVATAR_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getProfileAvatarCommon);
            if (response.data.success === true) {
                var { data } = response.data;
                yield put({
                    type: actions.GET_PROFILE_AVATAR_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

//#region subscription types
export function* getSubscriptionTypesCommon() {
    yield takeEvery(actions.GET_SUBSCRIPTION_TYPES_COMMON, function* ({ payload }) {
        try {
            var response = yield call(commonServices.getSubscriptionTypesCommon);
            if (response.data.success === true) {
                var { data } = response.data.data;
                yield put({
                    type: actions.GET_SUBSCRIPTION_TYPES_COMMON_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.COMMON_RESPONSE_ERROR })
        }
    })
}
//#endregion

export default function* rootSaga() {
    yield all([
        fork(getVersionApi),
        fork(getGroupsCommon),
        fork(getProfileTypesCommon),
        fork(getNations),
        fork(getProvinces),
        fork(getDistricts),
        fork(getWards),
        fork(getTopicsCommon),
        fork(getCareersCommon),
        fork(getSubcriptionPackagesCommon),
        fork(getSubcriptionPackagesWithTrialCommon),
        fork(getGendersCommon),
        fork(getLanguagesCommon),
        fork(getProfileAvatarCommon),
        fork(getSignalTypesCommon),
        fork(getSubscriptionTypesCommon),
        fork(getSubcriptionPackagesByRoleCommon),
    ])
}
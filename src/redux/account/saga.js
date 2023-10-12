import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as accountServices from '@iso/services/account';
import commonAction from '@iso/redux/common/actions';

const { getDistricts, getWards } = commonAction;

export function* changePassword() {
    yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(accountServices.changePassword, model);
            if (response.data.success) {
                yield cbSuccess();
            }
        } catch (e) {
            if (e.response && e.response.data)
                yield cbError(e.response.data.ErrorMessage);
            else
                yield cbError();
        }
    })
}

export function* userLoginProfile() {
    yield takeEvery(actions.USER_LOGIN_PROFILE, function* ({ payload }) {
        try {
            var response = yield call(accountServices.userLoginProfile);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.USER_LOGIN_PROFILE_SUCCESS,
                    payload: { data }
                });

                if (data.provinceId)
                    yield put(getDistricts(data.provinceId))
                if (data.districtId)
                    yield put(getWards(data.districtId))
            }
        } catch (error) {
            yield put({ type: actions.USER_LOGIN_PROFILE_ERROR });
        }
    })
}

export function* updateUserLoginProfile() {
    yield takeEvery(actions.USER_LOGIN_UPDATE_PROFILE, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(accountServices.updateUserLoginProfile, model);
            if (response.data.data != null) {
                yield cbSuccess();
            }
        } catch (e) {
            if (e.response && e.response.data)
                yield cbError(e.response.data.ErrorMessage);
            else
                yield cbError();
        }
    })
}


export function* accountRoles() {
    yield takeEvery(actions.ACCOUNT_ROLES, function* ({ payload }) {
        try {
            var response = yield call(accountServices.accountRoles);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.ACCOUNT_ROLES_SUCCESS,
                    payload: { data }
                });
            }
        } catch (error) {
            yield put({ type: actions.ACCOUNT_LOADING_FALSE });
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(changePassword),
        fork(userLoginProfile),
        fork(updateUserLoginProfile),
        fork(accountRoles),
    ])
}
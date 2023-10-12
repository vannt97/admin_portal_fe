import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as userServices from '@iso/services/user';

//#region CRUD
export function* getUsers() {
    yield takeEvery(actions.GET_USERS, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(userServices.getUsers, model);
            if (response.data.success === true) {
                var data = response.data.data.data;
                var totalItems = response.data.data.total;
                yield put({
                    type: actions.GET_USERS_SUCCESS,
                    payload: { data, totalItems }
                })
            }
        } catch (e) {
            yield put({
                type: actions.GET_USERS_ERROR,
            })
        }
    })
}
export function* deleteUser() {
    yield takeEvery(actions.DELETE_USER, function* ({ payload, cbSuccess, cbError }) {
        const { id } = payload;
        try {
            var response = yield call(userServices.deleteUser, id);
            if (response.data.success === true) {
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
export function* getUserDetail() {
    yield takeEvery(actions.GET_USER_DETAIL, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(userServices.getUserDetail, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_USER_DETAIL_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({
                type: actions.GET_USER_DETAIL_ERROR,
            })
        }
    })
}
export function* createUser() {
    yield takeEvery(actions.CREATE_USER, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(userServices.createUser, model);
            if (response.data.success === true) {
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
export function* updateUser() {
    yield takeEvery(actions.UPDATE_USER, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(userServices.updateUser, model);
            if (response.data.success === true) {
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
//#endregion


export function* resetPassword() {
    yield takeEvery(actions.USER_RESET_PASSWORD, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(userServices.resetPassword, model);
            if (response.data.success === true) {
                var res = response.data.data.password;
                yield cbSuccess(res);
            }
        } catch (e) {
            if (e.response && e.response.data)
                yield cbError(e.response.data.ErrorMessage);
            else
                yield cbError();
        }
    })
}



//#region ACCESS PERMISSION
export function* userAccessPermission() {
    yield takeEvery(actions.USER_ACCESS_PERMISSTION, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(userServices.userAccessPermission, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.USER_ACCESS_PERMISSTION_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({
                type: actions.USER_ACCESS_PERMISSTION_ERROR,
            })
        }
    })
}
export function* updateUserAccessPermission() {
    yield takeEvery(actions.UPDATE_USER_ACCESS_PERMISSTION, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(userServices.updateUserAccessPermission, model);
            if (response.data.success === true) {
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
//#endregion

export default function* rootSaga() {
    yield all([
        fork(getUsers),
        fork(deleteUser),
        fork(getUserDetail),
        fork(createUser),
        fork(updateUser),
        fork(resetPassword),
        fork(userAccessPermission),
        fork(updateUserAccessPermission),
    ])
}
import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import * as roleServices from '@iso/services/role';

//#region CRUD
export function* getRoles() {
    yield takeLatest(actions.GET_ROLES, function* ({ payload }) {
        const { model } = payload;
        try {
            var response = yield call(roleServices.getRoles, model);
            if (response.data.success === true) {
                var data = response.data.data.data;
                var totalItems = response.data.data.total;
                yield put({
                    type: actions.GET_ROLES_SUCCESS,
                    payload: { data, totalItems }
                })
            }
        } catch (e) {
            yield put({ type: actions.ROLE_LOADING_FALSE })
        }
    })
}
export function* createRole() {
    yield takeLatest(actions.CREATE_ROLE, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(roleServices.createRole, model);
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
export function* updateRole() {
    yield takeLatest(actions.UPDATE_ROLE, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(roleServices.updateRole, model);
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
export function* deleteRole() {
    yield takeLatest(actions.DELETE_ROLE, function* ({ payload, cbSuccess, cbError }) {
        const { id } = payload;
        try {
            var response = yield call(roleServices.deleteRole, id);
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
export function* getRoleDetail() {
    yield takeLatest(actions.GET_ROLE_DETAIL, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(roleServices.getRoleDetail, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.GET_ROLE_DETAIL_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.ROLE_LOADING_FALSE })
        }
    })
}

//#endregion

//#region ACCESS PERMISSION
export function* roleAccessPermission() {
    yield takeLatest(actions.ROLE_ACCESS_PERMISSTION, function* ({ payload }) {
        const { id } = payload;
        try {
            var response = yield call(roleServices.roleAccessPermission, id);
            if (response.data.success === true) {
                var data = response.data.data;
                yield put({
                    type: actions.ROLE_ACCESS_PERMISSTION_SUCCESS,
                    payload: { data }
                })
            }
        } catch (e) {
            yield put({ type: actions.ROLE_LOADING_FALSE })
        }
    })
}
export function* updateRoleAccessPermission() {
    yield takeLatest(actions.UPDATE_ROLE_ACCESS_PERMISSTION, function* ({ payload, cbSuccess, cbError }) {
        const { model } = payload;
        try {
            var response = yield call(roleServices.updateRoleAccessPermission, model);
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
        fork(getRoles),
        fork(createRole),
        fork(updateRole),
        fork(deleteRole),
        fork(getRoleDetail),
        fork(roleAccessPermission),
        fork(updateRoleAccessPermission),
    ])
}
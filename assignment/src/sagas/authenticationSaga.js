import { put, call } from "@redux-saga/core/effects";
import { loginUserService} from "../services/authenticanService";

import * as types from '../actions';

export function* loginSaga(payload) {
    try {
        const response = yield call(loginUserService, payload);
        yield put({ type: types.LOGIN_USER_SUCCESS, response})
        
    } catch (error) {
        yield put({ type: types.LOGIN_USER_ERROR, error})
    }
}
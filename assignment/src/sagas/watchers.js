import { takeLatest } from "@redux-saga/core/effects";
import { loginSaga } from "./authenticationSaga";
import { currentWeatherSaga } from "./currentWeatherSaga";
import { monthlyWeatherSaga } from "./monthlyWeatherSaga";

import * as types from "../actions";

export default function* watchUserAuthentication() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.CURRENT_WEATHER_DATA, currentWeatherSaga);
  yield takeLatest(types.MONTHLY_WEATHER_DATA, monthlyWeatherSaga);
}

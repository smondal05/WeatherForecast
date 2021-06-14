import { put, call } from "@redux-saga/core/effects";
import { monthlyWeatherDataService } from "../services/monthlyWeatherService";

import * as types from "../actions";

export function* monthlyWeatherSaga(payload) {
  try {
    const response = yield call(monthlyWeatherDataService, payload);
    yield put({ type: types.MONTHLY_WEATHER_DATA_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.MONTHLY_WEATHER_DATA_ERROR, error });
  }
}

import { put, call } from "@redux-saga/core/effects";
import { currentWeatherDataService } from "../services/currentWeatherService";

import * as types from "../actions";

export function* currentWeatherSaga(payload) {
  try {
    const response = yield call(currentWeatherDataService, payload);
    yield put({ type: types.CURRENT_WEATHER_DATA_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.CURRENT_WEATHER_DATA_ERROR, error });
  }
}

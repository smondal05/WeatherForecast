import * as types from "../actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = [], action) {
  const response = action.response;

  switch (action.type) {
    case types.CURRENT_WEATHER_DATA_SUCCESS:
      return { ...state, response };
    case types.CURRENT_WEATHER_DATA_ERROR:
      return { ...state, response };
    default:
      return state;
  }
}

import * as types from "./index";

export const currentWeatherDataAction = (city) => {
  return {
    type: types.CURRENT_WEATHER_DATA,
    city,
  };
};

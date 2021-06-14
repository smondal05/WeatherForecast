import * as types from "./index";

export const monthlyWeatherDataAction = (city) => {
  return {
    type: types.MONTHLY_WEATHER_DATA,
    city,
  };
};

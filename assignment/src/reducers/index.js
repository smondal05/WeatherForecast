import { combineReducers } from "redux";
import login from "./loginReducer";
import currentWeather from "./currentWeatherReducer";
import monthlyWeather from "./monthlyWeatherReducer";

const rootReducer = combineReducers({
  login,
  currentWeather,
  monthlyWeather,
});

export default rootReducer;

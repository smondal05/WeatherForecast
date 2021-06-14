export const currentWeatherDataService = (request) => {
  // API endpoint to be set here if at all found out.

  const API_KEY = "0c73d607a702414acfb96f8c55152ae9";
  const CURRENT_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${request.city}&appid=${API_KEY}`;

  return fetch(CURRENT_WEATHER_API_ENDPOINT)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

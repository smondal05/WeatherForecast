export const monthlyWeatherDataService = (request) => {
  // API endpoint to be set here if at all found out.

  const API_KEY = "0c73d607a702414acfb96f8c55152ae9";
  const MONTHLY_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?q=${request.city},us&mode=json&appid=${API_KEY}`;

  return fetch(MONTHLY_WEATHER_API_ENDPOINT)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.error(
        "Failed to receive response from MONTHLY_WEATHER_API. Error --> ",
        err
      );
    });
};

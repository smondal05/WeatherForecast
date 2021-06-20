export const loginUserService = (request) => {
  // API endpoint to be set here if at all found out.

  // const LOGIN_API_ENDPOINT = "http://localhost:8080/login";
  const LOGIN_API_ENDPOINT = "";

  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "appliaction/json",
    },
    body: JSON.stringify(request.user),
  };

  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });
};

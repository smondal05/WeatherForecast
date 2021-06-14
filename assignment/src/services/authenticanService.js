export const loginUserService = (request) => {
    // API endpoint to be set here if at all found out.

    const LOGIN_API_ENDPOINT = 'http://localhost:8080/login';

    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'appliaction/json'
        },
        body: JSON.stringify(request.user)
    }
    
    return fetch (LOGIN_API_ENDPOINT, parameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });

     // A way around to have a sample response for particular email and password
    //  const sampleResponse = function() {
    //     const defaultUser = {email: "admin@gmail.com", password: "password"}
    //     let response = null;
    //         if (JSON.stringify(request.user) === JSON.stringify(defaultUser)) {
    //             response = {
    //                 "success": true,
    //                 "message": "Login Successful",
    //                 "token": "JWT defaulttoken"
    //             }
    //         } else {
    //             response = {
    //                 "success": false,
    //                 "message": "Login Unsuccessful"
    //             }
    //         }
    //         return response;
    // }
    // sampleResponse();
    //End of way around
};
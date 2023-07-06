import axios from '../axios.js';

// Auth login
export const signIn = (payload) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/auth/login`, payload)
            .then((response) => {
                const token = response.data.auth_token; // Assuming the token is returned in the response

                // Store the token in local storage
                localStorage.setItem('token', token);

                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

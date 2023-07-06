import axios from '../axios.js';

// Fetch all groups
export const getGroups = (payload) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/todos`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Add new group
export const addGroup = (payload) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/todos`, payload)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

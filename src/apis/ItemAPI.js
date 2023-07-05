import axios from '../axios.js';

export const getItems = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/todos/${id}/items`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

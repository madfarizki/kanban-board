import axios from '../axios.js';

// Fetch all items for a specific group ID
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

// Add an item for a specific group ID
export const addItem = (id, payload) => {
    return new Promise((resolve, reject) => {
        axios
          .post(`/todos/${id}/items`, payload)
          .then((response) => {
              resolve(response);
          })
          .catch((error) => {
              reject(error);
          });
    });
};

// Edit an item for a specific ID and group ID
export const editItem = (id, groupID, payload) => {
  return new Promise((resolve, reject) => {
    const data = {
      target_todo_id : groupID,
      name: payload.name,
      progress_percentage: payload.progress_percentage,
    }
    axios
      .put(`/todos/${groupID}/items/${id}`, data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Delete an item for a specific group ID and item ID
export const deleteItem = (groupID, id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/todos/${groupID}/items/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

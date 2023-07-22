import axios from '../axios.tsx'

// Fetch all items for a specific TaskGroup ID
export const getItems = (id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/todos/${id}/items`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Add an TaskItem for a specific TaskGroup ID
export const addItem = (id: number, payload: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/todos/${id}/items`, payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Edit an TaskItem for a specific ID and TaskGroup ID
export const editItem = (id: number, groupID: number, payload: any) => {
  return new Promise((resolve, reject) => {
    const data = {
      target_todo_id: payload.targetID ? payload.targetID : groupID,
      name: payload.name,
      progress_percentage: payload.progress_percentage
    }
    axios
      .put(`/todos/${groupID}/items/${id}`, data)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Delete an TaskItem for a specific TaskGroup ID and TaskItem ID
export const deleteItem = (groupID: number, id: number) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/todos/${groupID}/items/${id}`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

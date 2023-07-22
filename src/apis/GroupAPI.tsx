import axios from '../axios.tsx'

// Fetch all groups
export const getGroups = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/todos`)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Add new TaskGroup
export const addGroup = (payload?: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/todos`, payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

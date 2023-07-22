import axios from '../axios.tsx'

export const getGroups = async () => {
  const response = await axios.get(`/todos`)
  return response
}

export const addGroup = async (payload?: any) => {
  const response = await axios.post(`/todos`, payload)
  return response
}

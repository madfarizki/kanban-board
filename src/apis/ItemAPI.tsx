import axios from '../axios.tsx'

export const getItems = async (id: number) => {
  const response = await axios.get(`/todos/${id}/items`)
  return response
}

export const addItem = async (id: number, payload: any) => {
  const response = await axios.post(`/todos/${id}/items`, payload)
  return response
}

export const editItem = async (id: number, groupID: number, payload: any) => {
  const data = {
    target_todo_id: payload.targetID ? payload.targetID : groupID,
    name: payload.name,
    progress_percentage: payload.progress_percentage
  }
  const response = await axios.put(`/todos/${groupID}/items/${id}`, data)
  return response
}

export const deleteItem = async (groupID: number, id: number) => {
  const response = await axios.delete(`/todos/${groupID}/items/${id}`)
  return response
}

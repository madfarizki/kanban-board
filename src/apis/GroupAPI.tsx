import axios from '../axios.tsx';

// Fetch all groups
export const getGroups = async () => {
  const response = await axios.get(`/todos`);
  return response;
};

// Add new TaskGroup
export const addGroup = async (payload?: any) => {
  const response = await axios.post(`/todos`, payload);
  return response;
};

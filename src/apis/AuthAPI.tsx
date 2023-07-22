import axios from '../axios.tsx'

// Auth login
export const signIn = async (payload: any) => {
  const response = await axios.post(`/auth/login`, payload);
  const token = response.data.auth_token;

  // Store the token in local storage
  localStorage.setItem('token', token);

  return response;
};

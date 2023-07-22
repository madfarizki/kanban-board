import axios from '../axios.tsx'

// Auth login
export const signIn = (payload: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/auth/login`, payload)
      .then((response) => {
        const token = response.data.auth_token // Assuming the token is returned in the response

        // Store the token in local storage
        localStorage.setItem('token', token)

        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

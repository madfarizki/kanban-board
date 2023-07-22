import { useEffect, useState } from 'react'
import { signIn } from '../apis/AuthAPI'

export function useSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      const payload = {
        email: 'ahmad@ahmad.com',
        password: 'password'
      }

      signIn(payload)
        .then(() => {
          console.log('Login success')
          setIsSignedIn(true)
        })
        .catch((error) => {
          console.error(error.response.data.message)
        })
    } else {
      setIsSignedIn(true)
    }
  }, [])

  return isSignedIn
}

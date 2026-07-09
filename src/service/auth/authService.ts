import Cookies from 'js-cookie'

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (Payload: LoginPayload) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(Payload)
      })

      const result = await response.json()

      if(!response.ok) {
        return {error: {message: result.message || "Login Failed"}}
      }
      if (response.ok && result.token) {
        Cookies.set("token", result.token, {
          expires: 1,
          secure: true,
          sameSite: 'none',
          path: '/'
        })
      }

      return result
    } catch (error) {
      console.log("Loging Error", error)
    }
  },
  signup: async (Payload: RegisterPayload) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(Payload)
      })

      const result = await response.json()

      if(!response.ok) {
        return {error: {message: result.message || "Signup Failed"}}
      }
      
      if (response.ok && result.token) {
        Cookies.set("token", result.token, {
          expires: 1,
          secure: true,
          sameSite: 'none',
          path: '/'
        })
      }

      return result
    } catch (error) {
      console.log("Loging Error", error)
    }
  }
}


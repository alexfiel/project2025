'use client'

import { login } from "@/actions"
import { useFormState } from "react-dom"



const LoginFormX = () => {
    const [state, formAction] = useFormState<any,FormData>(login, undefined)
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        type="text"
        name="username"
        required
        placeholder="Username"
        className="border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
      >
        Login
      </button>
      {state?.error && <p>{state.error}</p>};
      
    </form>
  )
}

export default LoginFormX

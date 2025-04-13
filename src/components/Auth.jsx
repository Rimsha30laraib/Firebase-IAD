import React from "react"
import { login, logout, loggedInUserDisplayName } from "../services/authService"

export function Signin() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut() {
  return (
    <div>
      Hello, {loggedInUserDisplayName()}
      <br />
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}

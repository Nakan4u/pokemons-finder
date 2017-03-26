import React from 'react'

const LoginFrom = () => (
  <form name="loginForm">
    <input type="text" name="userName" value="User"/>
    <input type="password" name="userPass" value="1234"/>
    <button type="submit">Login</button>
  </form>
)

export default LoginFrom

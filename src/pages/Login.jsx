import React from 'react'
import { Link } from 'react-router'

function Login() {
  return (
    <section className='login-page'>
      <h2>Login</h2>
      <form className='login-input'>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button type='submit'>Login</button>
      </form>
      <p className='register-info'>
          Belum punya akun? <Link to='/register'>Daftar di sini.</Link>
      </p>
  </section>
  )
}

export default Login
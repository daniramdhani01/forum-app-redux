import React from 'react'

function Register() {
  return (
    <section className='register-page'>
    <h2>Register Page</h2>
    <form className='register-input'>
        <input type='text' placeholder='Name' />
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Register</button>
    </form>
    </section>
  )
}

export default Register
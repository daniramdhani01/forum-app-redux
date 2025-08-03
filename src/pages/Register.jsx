import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../redux/action';

function Register() {
  const loading = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e)=>{
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(authService.register(state));
  };
  return (
    <section className='register-page'>
      <h2>Register Page</h2>
      <form className='register-input' onSubmit={handleOnSubmit}>
        <input type='text' placeholder='Name' name='name' onChange={handleChange} value={state.name}/>
        <input type='email' placeholder='Email' name='email' onChange={handleChange} value={state.email}/>
        <input type='password' placeholder='Password' name='password' onChange={handleChange} value={state.password}/>
        <button type='submit' disabled={loading?.default > 0}>Register</button>
      </form>
    </section>
  );
}

export default Register;
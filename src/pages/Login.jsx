import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authService } from '../redux/action';

function Login() {
  const { dispatch: loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e)=>{
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(authService.login(state));
  };

  return (
    <section className='login-page'>
      <h2>Login</h2>
      <form className='login-input' onSubmit={handleOnSubmit}>
        <input type='email' name='email' placeholder='Email' required onChange={handleChange}/>
        <input type='password' name='password' placeholder='Password' required  onChange={handleChange}/>
        <button type='submit' disabled={loading?.default > 0}>Login</button>
      </form>
      <p className='register-info'>
          Belum punya akun? <Link to='/register'>Daftar di sini.</Link>
      </p>
    </section>
  );
}

export default Login;
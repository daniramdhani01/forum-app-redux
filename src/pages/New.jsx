import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postThreads } from '../redux/action';
import { useNavigate } from 'react-router-dom';

function NewThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: '',
    category: '',
    body: '',
  });

  const handleChange = (e)=> setState((prev) => {
    const { name, value } = e.target;
    return { ...prev, [name]: value };
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const success =  await dispatch(postThreads(state));
    if (success) navigate('/');
  };
  return (
    <div className='new-thread-page'>
      <h2>Buat Diskusi Baru</h2>
      <form className='new-thread-input' onSubmit={handleSubmit}>
        <input name='title' placeholder='Judul' defaultValue='' required onChange={handleChange}/>
        <input name='category' placeholder='Kategori' defaultValue='' required onChange={handleChange}/>
        <textarea name='body' className='input-body' placeholder='' required onChange={handleChange}/>
        <button type='submit'>Buat</button>
      </form>
    </div>
  );
}

export default NewThread;
import { instance } from '../api/axiosInstance';
import { ALL_PROFILE, GLOBAL_LOADING, LEADERBOARDS, LOGIN, MY_PROFILE, REGISTER, THREAD_DETAIL, THREADS } from './types';

instance.interceptors.request.use(
  (config)=>{
    const apiNeedToken = ['/threads', 'users/me'];
    const token = sessionStorage.getItem('dcdRdxNkt') || '';
    if (!token && !apiNeedToken.includes(config.url)) return config;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error)=> Promise.reject(error)
);

const setGlobalLoading = (payload)=> (dispatch)=> {
  dispatch({ type: GLOBAL_LOADING, payload });
};

export const getProfile = ()=> async (dispatch) => {
  dispatch(setGlobalLoading(true));
  try {
    const { data } = await instance.get('/users/me');
    dispatch({ type: MY_PROFILE, payload: data });
  } catch (error) {
    alert(error);
  } finally {
    dispatch(setGlobalLoading(false));
  }
};

export const loginUser = ({ email, password })=> async (dispatch) =>{
  dispatch(setGlobalLoading(true));
  try {
    const { data } = await instance.post('/login', { email, password });
    const token = data.data.token;
    sessionStorage.setItem('dcdRdxNkt', token);
    dispatch({ type: LOGIN, payload: true });
  } catch (error) {
    alert(error);
  } finally {
    dispatch(setGlobalLoading(false));
  }
};

export const registerUser = ({ name, email, password })=> async (dispatch) => {
  dispatch(setGlobalLoading(true));
  try {
    await instance.post('/register', { name, email, password });
    dispatch(loginUser({ email, password }));
  } catch (error) {
    alert(error);
  } finally {
    dispatch(setGlobalLoading(false));
  }
};

export const postThreads = (body)=> async (dispatch) =>{
  dispatch(setGlobalLoading(true));
  try {
    const data = await instance.post('/threads', body);
    return true;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  } finally {
    dispatch(setGlobalLoading(false));
  }
};

export const getThreads = (id = '')=> async (dispatch, getState) =>{
  const hasUsers = getState().app.allUser.length > 0;
  dispatch(setGlobalLoading(true));
  try {
    const calls = [instance.get(id ? `/threads/${id}` : '/threads')];
    if (!hasUsers && !id) calls.push(instance.get('/users'));

    const [threads, users] = await Promise.all(calls);
    if (id) {
      dispatch({ type: THREAD_DETAIL, payload: threads.data.data.detailThread });
    } else {
      dispatch({ type: THREADS, payload: threads.data.data.threads });
      if (!hasUsers) dispatch({ type: ALL_PROFILE, payload: users.data.data.users });
    }
  } catch (error) {
    alert(error);
  } finally {
    dispatch(setGlobalLoading(false));
  }
};

export const getLeaderboards = ()=> async (dispatch) =>{
  dispatch(setGlobalLoading(true));
  try {
    const { data } = await instance.get('/leaderboards');
    dispatch({ type: LEADERBOARDS, payload: data.data.leaderboards });
  } catch (error) {
    alert(error);
  } finally {
    dispatch(setGlobalLoading(false));
  }
};
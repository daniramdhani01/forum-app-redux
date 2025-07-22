import { instance } from '../api/axiosInstance';
import { asyncActionHandler } from '../utils/asyncAction';
import { ALL_PROFILE, LEADERBOARDS, MY_PROFILE, THREAD_DETAIL, THREADS } from './types';

// export const registerUser = (name, email, password)=> async dispatch => new Promise((resolve, reject)=>
//   instance.post('/register', { name, email, password })
//     .then((res) => resolve(res))
//     .catch((err) => reject(err))
// );

// export const loginUser = (email, password)=> async dispatch => new Promise((resolve, reject)=>
//   instance.post('/login', { email, password })
//     .then((res) => resolve(res))
//     .catch((err) => reject(err))
// );

export const getAllUser = ()=>  (dispatch) =>
  asyncActionHandler({
    dispatch,
    types: ALL_PROFILE,
    apiCall: ()=>instance.get('/users'),
    onSuccess: ({ data })=> dispatch({ type: ALL_PROFILE, payload: data.data.users })
  });

export const getProfile = ()=> (dispatch) =>
  asyncActionHandler({
    dispatch,
    types: MY_PROFILE,
    apiCall: ()=>instance.get('/users/me'),
    // onSuccess: ({ data })=> dispatch({ type: MY_PROFILE, payload: data })
    onSuccess: ({ data })=> console.log('daniw me', data)
  });

export const getThreads = (id = '')=> (dispatch, getState) =>{
  const hasUsers = getState().app.allUser.length > 0;

  return asyncActionHandler({
    dispatch,
    types: THREADS,
    apiCall: ()=>{
      const calls = [instance.get(id ? `/threads/${id}` : '/threads')];

      if (!hasUsers && !id) calls.push(instance.get('/users'));

      return Promise.all(calls);
    },
    onSuccess: (res)=>{
      const [threads, users] = res;

      if (id) {
        dispatch({ type: THREAD_DETAIL, payload: threads.data.data.detailThread });
      } else {
        dispatch({ type: THREADS, payload: threads.data.data.threads });
        if (!hasUsers) dispatch({ type: ALL_PROFILE, payload: users.data.data.users });
      }
    }
  });
};

export const getLeaderboards = ()=> (dispatch) =>
  asyncActionHandler({
    dispatch,
    types: LEADERBOARDS,
    apiCall: ()=>instance.get('/leaderboards'),
    onSuccess: ({ data })=> dispatch({ type: LEADERBOARDS, payload: data.data.leaderboards })
  });
import { abortManager } from '../api/abortManager';
import { instance } from '../api/axiosInstance';
import {
  ALL_PROFILE,
  GLOBAL_LOADING,
  LEADERBOARDS,
  LOGIN,
  MY_PROFILE,
  THREAD_DETAIL,
  THREADS
} from './types';

// === Helper global ===
const handleRequest = async (dispatch, fn, opts = {}) => {
  const { signalKey } = opts;

  const controller = abortManager.create(signalKey);

  dispatch({ type: GLOBAL_LOADING, payload: true });
  try {
    await fn(controller.signal);
    return true;
  } catch (error) {
    if (error && error.code === 'ERR_CANCELED') return false;
    alert(error?.response?.data?.message || error.message);
    return false;
  } finally {
    dispatch({ type: GLOBAL_LOADING, payload: false });
  }
};

// === Auth Service ===
export const authService = {
  login: ({ email, password }) => async (dispatch) => {
    return await handleRequest(dispatch, async (signal) => {
      const { data } = await instance.post('/login', { email, password }, { signal });
      sessionStorage.setItem('dcdRdxNkt', data.data.token);
      dispatch({ type: LOGIN, payload: true });
    }, { signalKey: 'auth-login' });
  },

  register: ({ name, email, password }) => async (dispatch) => {
    return await handleRequest(dispatch, async (signal) => {
      await instance.post('/register', { name, email, password }, { signal });
      await authService.login({ email, password })(dispatch); // chaining login
    }, { signalKey: 'auth-register' });
  },
};

// === User Service ===
export const userService = {
  getMyProfile: () => async (dispatch) => {
    return await handleRequest(dispatch, async (signal) => {
      const { data } = await instance.get('/users/me', { signal });
      dispatch({ type: MY_PROFILE, payload: data.data.user });
    }, { signalKey: 'users-me' });
  }
};

export const clearThreads = () => ({
  type: THREADS,
  payload: null,
});

export const clearThreadDetail = () => ({
  type: THREAD_DETAIL,
  payload: null,
});

// === Threads Service ===
export const threadsService = {
  create: (body) => async (dispatch) => {
    return await handleRequest(dispatch, async (signal) => {
      await instance.post('/threads', body, { signal });
    }, { signalKey: 'threads-create' });
  },

  fetch: (id = '') => async (dispatch, getState) => {
    return await handleRequest(dispatch, async (signal) => {
      const hasUsers = getState().app.allUser.length > 0;
      const calls = [instance.get(id ? `/threads/${id}` : '/threads', { signal })];
      if (!hasUsers && !id) calls.push(instance.get('/users', { signal }));

      const [threads, users] = await Promise.all(calls);
      if (id) {
        dispatch({ type: THREAD_DETAIL, payload: threads.data.data.detailThread });
      } else {
        dispatch({ type: THREADS, payload: threads.data.data.threads });
        if (!hasUsers) {
          dispatch({ type: ALL_PROFILE, payload: users.data.data.users });
        }
      }
    }, { signalKey: 'threads-fetch' });
  },
};

export const clearLeaderboard = () => ({
  type: LEADERBOARDS,
  payload: null,
});

// === Leaderboard Service ===
export const leaderboardService = {
  fetch: () => async (dispatch) => {
    return await handleRequest(dispatch, async (signal) => {
      const { data } = await instance.get('/leaderboards', { signal });
      dispatch({ type: LEADERBOARDS, payload: data.data.leaderboards });
    }, { signalKey: 'leaderboards' });
  }
};
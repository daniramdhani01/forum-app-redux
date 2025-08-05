import { instance } from '../api/axiosInstance';
import {
  ALL_PROFILE,
  CREATE_COMMENT_OPTIMISTIC,
  GLOBAL_LOADING,
  LEADERBOARDS,
  LOGIN,
  MY_PROFILE,
  THREAD_DETAIL,
  THREADS
} from './types';

// === Interceptor untuk token ===
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('dcdRdxNkt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === Helper global ===
const handleRequest = async (dispatch, fn) => {
  dispatch({ type: GLOBAL_LOADING, payload: true });
  try {
    await fn();
    return true;
  } catch (error) {
    alert(error?.response?.data?.message || error.message);
    return false;
  } finally {
    dispatch({ type: GLOBAL_LOADING, payload: false });
  }
};

// === Auth Service ===
export const authService = {
  login: ({ email, password }) => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      const { data } = await instance.post('/login', { email, password });
      sessionStorage.setItem('dcdRdxNkt', data.data.token);
      dispatch({ type: LOGIN, payload: true });
    });
  },

  register: ({ name, email, password }) => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      await instance.post('/register', { name, email, password });
      await authService.login({ email, password })(dispatch); // chaining login
    });
  },
};

// === User Service ===
export const userService = {
  getMyProfile: () => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      const { data } = await instance.get('/users/me');
      dispatch({ type: MY_PROFILE, payload: data.data.user });
    });
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
    return await handleRequest(dispatch, async () => {
      await instance.post('/threads', body);
    });
  },

  fetch: (id = '') => async (dispatch, getState) => {
    return await handleRequest(dispatch, async () => {
      const hasUsers = getState().app.allUser.length > 0;
      const calls = [instance.get(id ? `/threads/${id}` : '/threads')];
      if (!hasUsers && !id) calls.push(instance.get('/users'));

      const [threads, users] = await Promise.all(calls);
      if (id) {
        dispatch({ type: THREAD_DETAIL, payload: threads.data.data.detailThread });
      } else {
        dispatch({ type: THREADS, payload: threads.data.data.threads });
        if (!hasUsers) {
          dispatch({ type: ALL_PROFILE, payload: users.data.data.users });
        }
      }
    });
  },

  upVote: (threadId) => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      await instance.post(`/threads/${threadId}/up-vote`);
    });
  },

  downVote: (threadId) => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      await instance.post(`/threads/${threadId}/down-vote`);
    });
  },

  comments: {
    create: (threadId, content) => async (dispatch) => {
      return dispatch({ type: CREATE_COMMENT_OPTIMISTIC, payload: { threadId, content } });
    },

    upVote: (threadId, commentId) => async (dispatch) => {
      return await handleRequest(dispatch, async () => {
        await instance.post(`/threads/${threadId}/comments/${commentId}/up-vote`);
      });
    },

    downVote: (threadId, commentId) => async (dispatch) => {
      return await handleRequest(dispatch, async () => {
        await instance.post(`/threads/${threadId}/comments/${commentId}/down-vote`);
      });
    },
  },
};

export const clearLeaderboard = () => ({
  type: LEADERBOARDS,
  payload: null,
});

// === Leaderboard Service ===
export const leaderboardService = {
  fetch: () => async (dispatch) => {
    return await handleRequest(dispatch, async () => {
      const { data } = await instance.get('/leaderboards');
      dispatch({ type: LEADERBOARDS, payload: data.data.leaderboards });
    });
  }
};
import { ALL_PROFILE, FETCH_ALL_USER, GLOBAL_LOADING, LEADERBOARDS, LOGIN, MY_PROFILE, THREAD_DETAIL, THREADS, SET_COMMENT } from './types';

const initialState = {
  leaderboards: [],
  myProfile: {},
  allUser: [],
  threads: [],
  threadDetail: {
    id: '',
    title: '',
    body: '',
    createdAt: '',
    owner: {
      id: '',
      name: '',
      avatar: '',
    },
    category: '',
    comments: [],
    upVotesBy: [],
    downVotesBy: [],
  },
  isLogin: false,
  globalLoading: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case GLOBAL_LOADING:
    return {
      ...state,
      globalLoading: action.payload
    };
  case LOGIN:
    return {
      ...state,
      isLogin: action.payload
    };
  case ALL_PROFILE:
    return {
      ...state,
      allUser: action.payload
    };
  case MY_PROFILE:
    return {
      ...state,
      myProfile: action.payload
    };
  case THREADS:
    return {
      ...state,
      threads: action.payload || initialState.threads
    };
  case THREAD_DETAIL:
    return {
      ...state,
      threadDetail: action.payload || initialState.threadDetail
    };
  case LEADERBOARDS:
    return {
      ...state,
      leaderboards: action.payload || initialState.leaderboards
    };
  case SET_COMMENT:
    return {
      ...state,
      threadDetail: {
        ...state.threadDetail,
        comments: action.payload
      }
    };
  case FETCH_ALL_USER:
    break;
  default:
    return initialState;
  }
}
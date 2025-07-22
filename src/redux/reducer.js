import { ALL_PROFILE, FETCH_ALL_USER, LEADERBOARDS, MY_PROFILE, THREAD_DETAIL, THREADS } from './types';

const initialState = {
  leaderboards: [],
  myProfile: {},
  allUser: [],
  threads: [],
  threadDetail: {}
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
      threads: action.payload
    };
  case THREAD_DETAIL:
    return {
      ...state,
      threadDetail: action.payload
    };
  case LEADERBOARDS:
    return {
      ...state,
      leaderboards: action.payload
    };
  case FETCH_ALL_USER:
    break;
  default:
    return initialState;
  }
}
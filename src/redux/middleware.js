import { hideLoading, showLoading } from 'react-redux-loading-bar';


export const loadingMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action?.type?.includes('REQUEST')) {
    dispatch(showLoading());
  } else if (action?.type?.includes('SUCCESS') || action?.type?.includes('FAILURE')) {
    dispatch(hideLoading());
  }

  return next(action);
};
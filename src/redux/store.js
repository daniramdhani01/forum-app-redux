import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { loadingMiddleware } from './middleware';
import { thunk } from 'redux-thunk';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default configureStore({
  reducer: {
    app: reducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(loadingMiddleware),
});
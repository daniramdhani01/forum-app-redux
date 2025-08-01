import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

export default configureStore({
  reducer: {
    app: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false
    }),
});
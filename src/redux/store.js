import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import optimistic from './middleware/optimistic';

export default configureStore({
  reducer: {
    app: reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false }).concat(optimistic),
});
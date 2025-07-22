import { createAsyncType } from '../redux/types';

export const asyncActionHandler = async ({
  dispatch,
  type,
  apiCall,
  onSuccess,
  onError
})=>{
  const types = createAsyncType(type);
  dispatch({ type: types.REQUEST });
  try {
    const data = await apiCall();
    dispatch({ type: types.SUCCESS, payload: data });
    onSuccess?.(data);
  } catch (error) {
    dispatch({ type: types.FAILURE, error });
    onError?.(error);
  }
};
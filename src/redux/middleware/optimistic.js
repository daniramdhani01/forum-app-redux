import { v4 as uuidv4 } from 'uuid';
import { instance } from '../../api/axiosInstance';
import { SET_COMMENT, CREATE_COMMENT_OPTIMISTIC } from '../types';

const optimistic = ({ getState, dispatch }) => (next) => async (action) => {
  const { type, payload } = action;

  switch (type) {
  case CREATE_COMMENT_OPTIMISTIC:
    try {
      const { threadDetail, myProfile } = getState().app;
      const { threadId, content } = payload;
      const newComment = {
        id: uuidv4(),
        content,
        createdAt: new Date().toISOString(),
        upVotesBy: [],
        downVotesBy: [],
        owner: myProfile
      };
      const optimisticComments = [newComment, ...threadDetail.comments];
      dispatch({ type: SET_COMMENT, payload: optimisticComments });
      const { data } = await instance.post(`/threads/${threadId}/comments`, { content });
      const finalComment = [data.data.comment, ...threadDetail.comments];
      dispatch({ type: SET_COMMENT, payload: finalComment });
      return true;
    } catch (error) {
      const originalComments = [...getState().app.threadDetail.comments].slice(1);
      dispatch({ type: SET_COMMENT, payload: originalComments });
      alert(error?.response?.data?.message || error.message);
      return false;
    }

  default:
    break;
  }

  return next(action);
};

export default optimistic;

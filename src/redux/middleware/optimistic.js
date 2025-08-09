import { v4 as uuidv4 } from 'uuid';
import { instance } from '../../api/axiosInstance';
import { SET_COMMENT, CREATE_COMMENT_OPTIMISTIC, VOTE_THREAD_OPTIMISTIC, SET_VOTE_THREAD, VOTE_COMMENT_OPTIMISTIC } from '../types';

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
  case VOTE_THREAD_OPTIMISTIC:
    try {
      const { threadId, vote } = payload;
      const { threads, myProfile } = getState().app;
      const oppositeVoteKey = vote === 'up' ? 'downVotesBy' : 'upVotesBy';
      const voteKey = `${vote}VotesBy`;
      const thread = threads.find((item)=>item.id === threadId);
      if (!thread) return false;

      const originalThreads = threads;
      const newTread = {
        ...thread,
        [voteKey]: thread[voteKey].includes(myProfile.id) ? thread[voteKey].filter((item) => item !== myProfile.id) : [...thread[voteKey], myProfile.id],
        [oppositeVoteKey]: thread[oppositeVoteKey].includes(myProfile.id) ? thread[oppositeVoteKey].filter((item) => item !== myProfile.id) : thread[oppositeVoteKey],
      };
      const newThreads = threads.map((item)=> item.id === threadId ? newTread : item);
      dispatch({ type: SET_VOTE_THREAD, payload: newThreads });

      const voteApi = thread[voteKey].includes(myProfile.id) ? 'neutral' : vote;

      await instance.post(`/threads/${threadId}/${voteApi}-vote`)
        .catch((error) =>{
          throw { originalThreads, error };
        });
      return true;
    } catch (error) {
      if (error?.originalThreads) {
        dispatch({ type: SET_VOTE_THREAD, payload: error?.originalThreads });
        console.log(error.error);
        return false;
      }
      console.log(error);
      return false;
    }
  case VOTE_COMMENT_OPTIMISTIC:
    try {
      const { threadId, vote, isDetail = false } = payload;
      const { threads, myProfile } = getState().app;
      const oppositeVoteKey = vote === 'up' ? 'downVotesBy' : 'upVotesBy';
      const voteKey = `${vote}VotesBy`;
      const thread = threads.find((item)=>item.id === threadId);
      if (!thread) return false;

      const originalThreads = threads;
      const newTread = {
        ...thread,
        [voteKey]: thread[voteKey].includes(myProfile.id) ? thread[voteKey].filter((item) => item !== myProfile.id) : [...thread[voteKey], myProfile.id],
        [oppositeVoteKey]: thread[oppositeVoteKey].includes(myProfile.id) ? thread[oppositeVoteKey].filter((item) => item !== myProfile.id) : thread[oppositeVoteKey],
      };
      const newThreads = threads.map((item)=> item.id === threadId ? newTread : item);
      dispatch({ type: SET_VOTE_THREAD, payload: newThreads });

      const voteApi = thread[voteKey].includes(myProfile.id) ? 'neutral' : vote;

      await instance.post(`/threads/${threadId}/${voteApi}-vote`)
        .catch((error) =>{
          throw { originalThreads, error };
        });
      return true;
    } catch (error) {
      if (error?.originalThreads) {
        dispatch({ type: SET_VOTE_THREAD, payload: error?.originalThreads });
        console.log(error.error);
        return false;
      }
      console.log(error);
      return false;
    }

  default:
    break;
  }

  return next(action);
};

export default optimistic;

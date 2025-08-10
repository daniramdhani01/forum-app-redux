import { v4 as uuidv4 } from 'uuid';
import { instance } from '../../api/axiosInstance';
import { SET_COMMENT, CREATE_COMMENT_OPTIMISTIC, VOTE_THREAD_OPTIMISTIC, SET_THREADS, VOTE_COMMENT_OPTIMISTIC, VOTE_THREAD_DETAIL_OPTIMISTIC, SET_THREAD_DETAIL } from '../types';
import { updateVotes } from '../../utils/updateStateRedux';

const optimistic = ({ getState, dispatch }) => (next) => async (action) => {
  const { type, payload } = action;

  switch (type) {
  case CREATE_COMMENT_OPTIMISTIC: {
    const { threadDetail, myProfile } = getState().app;
    const { threadId, content } = payload;

    const tempId = uuidv4();
    const newComment = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      upVotesBy: [],
      downVotesBy: [],
      owner: myProfile
    };

    dispatch({ type: SET_COMMENT, payload: [newComment, ...threadDetail.comments] });

    try {
      const { data } = await instance.post(`/threads/${threadId}/comments`, { content });
      dispatch({
        type: SET_COMMENT,
        payload: [data.data.comment, ...threadDetail.comments]
      });
      return true;
    } catch (error) {
      const rolledBack = threadDetail.comments.filter((c) => c.id !== tempId);
      dispatch({ type: SET_COMMENT, payload: rolledBack });
      throw error;
    }
  }
  case VOTE_THREAD_OPTIMISTIC:
  case VOTE_THREAD_DETAIL_OPTIMISTIC:
  case VOTE_COMMENT_OPTIMISTIC: {
    const { threadId, commentId, vote } = payload;
    const { threads, threadDetail, myProfile } = getState().app;

    const oppositeVoteKey = vote === 'up' ? 'downVotesBy' : 'upVotesBy';
    const voteKey = `${vote}VotesBy`;
    const isVoteThread = VOTE_THREAD_OPTIMISTIC === type;
    const isVoteThreadDetail = VOTE_THREAD_DETAIL_OPTIMISTIC === type;
    const isVoteComment = VOTE_COMMENT_OPTIMISTIC === type;

    const originalState = isVoteThread ? [...threads] : { ...threadDetail };
    const thread = isVoteThread ? threads.find((item)=>item.id === threadId) : threadDetail;

    if (!thread) return false;

    const voteExist = isVoteThread || isVoteThreadDetail
      ? thread[voteKey].includes(myProfile.id)
      : threadDetail.comments.find((item)=>item.id === commentId)[voteKey].includes(myProfile.id);

    const voteApiStatus = voteExist ? 'neutral' : vote;
    const voteApi = isVoteComment
      ? `/threads/${threadId}/comments/${commentId}/${voteApiStatus}-vote`
      : `/threads/${threadId}/${voteApiStatus}-vote`;

    const setType = isVoteThread ? SET_THREADS : SET_THREAD_DETAIL;

    let updateData;

    if (isVoteComment){
      updateData = {
        ...threadDetail,
        comments: thread.comments.map((c) =>
          c.id === commentId
            ? updateVotes(c, voteKey, oppositeVoteKey, myProfile.id, voteExist)
            : c)
      };
    } else {
      updateData = updateVotes(thread, voteKey, oppositeVoteKey, myProfile.id, voteExist);
    }

    if (isVoteThread){
      dispatch({
        type: setType,
        payload: threads.map((t)=> t.id === threadId ? updateData : t)
      });
    } else {
      dispatch({ type: setType, payload: updateData });
    }

    try {
      await instance.post(voteApi);
      return true;
    } catch (error) {
      dispatch({ type: setType, payload: originalState });
      throw error;
    }
  }
  default:
    break;
  }

  return next(action);
};

export default optimistic;

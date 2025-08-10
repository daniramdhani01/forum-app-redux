import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearThreadDetail, threadsService } from '../../redux/action';
import { useParams } from 'react-router-dom';
import { calculateDate } from '../../utils/date';
import ThreadComment from '../../components/ThreadComment';
import { ReactComponent as Like } from '../../icons/like.svg';
import { ReactComponent as DisLike } from '../../icons/disLike.svg';
import { ReactComponent as LikeSolid } from '../../icons/likeSolid.svg';
import { ReactComponent as DisLikeSolid } from '../../icons/disLikeSolid.svg';
import { alertLoginForVote } from '../../utils/alert';
import { VOTE_COMMENT_OPTIMISTIC, VOTE_THREAD_DETAIL_OPTIMISTIC } from '../../redux/types';

function DetailThread() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { threadDetail, myProfile, isLogin } = useSelector((state) => state.app);

  const isMyVote = useCallback((arrayVote = [])=>{
    if (!myProfile.id) return false;
    return arrayVote.includes(myProfile.id);
  }, [myProfile]);

  const handleVote = (vote)=>{
    const payload = { vote, threadId: threadDetail.id };
    dispatch({ type: VOTE_THREAD_DETAIL_OPTIMISTIC,  payload });
  };

  const handleVoteComment = (vote, commentId)=>{
    const payload = { vote, threadId: threadDetail.id, commentId };
    dispatch({ type: VOTE_COMMENT_OPTIMISTIC,  payload });
  };

  const handleComment = async (comment)=>{
    return await dispatch(threadsService.comments.create(threadDetail.id, comment));
  };

  useEffect(()=>{
    if (id) dispatch(threadsService.fetch(id));

    return ()=> dispatch(clearThreadDetail());
  }, [dispatch, id]);

  if (!threadDetail?.id) return <></>;

  return (
    <section className='detail-page'>
      {/* Thread Header */}
      <header className='thread-header'>
        <p className='thread-header__category'>#{threadDetail.category}</p>
      </header>

      {/* Thread Content */}
      <div className='thread-content'>
        <h2>{threadDetail.title}</h2>
        <div className='thread-content__body' dangerouslySetInnerHTML={{ __html: threadDetail.body }}/>
      </div>

      {/* Thread Footer */}
      <footer className='thread-footer'>
        <button type='button' className='thread-upvote__button' onClick={()=>isLogin ? handleVote('up') : alertLoginForVote()}>
          {isMyVote(threadDetail.upVotesBy) ? <LikeSolid /> : <Like />}
          <span className='thread-upvote__label'>{threadDetail.upVotesBy.length}</span>
        </button>

        <button type='button' className='thread-downvote__button' onClick={()=>isLogin ? handleVote('down') : alertLoginForVote()}>
          {isMyVote(threadDetail.downVotesBy) ? <DisLikeSolid /> : <DisLike />}
          <span className='thread-downvote__label'>{threadDetail.downVotesBy.length}</span>
        </button>

        <div className='owner-info'>
          <span>Dibuat oleh</span>
          <img
            src={`https://ui-avatars.com/api/?name=${threadDetail.owner.name}&background=random`}
            alt='avatar'
          />
          <span>{threadDetail.owner.name}</span>
        </div>

        <p>{calculateDate(threadDetail.createdAt)}</p>
      </footer>
      <ThreadComment onSubmitComment={handleComment} vote={handleVoteComment}/>
    </section>
  );
}

export default DetailThread;
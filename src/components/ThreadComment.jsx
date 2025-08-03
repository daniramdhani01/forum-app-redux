import { useState } from 'react';
import { calculateDate } from '../utils/date';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as Like } from '../icons/like.svg';
import { ReactComponent as DisLike } from '../icons/disLike.svg';

function ThreadComment({ onSubmitComment, vote }) {
  const { threadDetail, isLogin } = useSelector((state) => state.app);
  const [comment, setComment] = useState('');
  return (
    <>
      {/* Thread Comments Section */}
      <div className='thread-comment'>
        {/* Comment Input */}
        <div className='thread-comment__input'>
          <h3>Beri komentar</h3>
          {isLogin ? (
            <form className='comment-input' onSubmit={async (e)=>{
              e.preventDefault();
              const res = await onSubmitComment(comment);
              if (res) setComment('');
            }}>
              <textarea className='comment-input__field' value={comment} onChange={(e)=>setComment(e.target.value)} required/>
              <button type='submit'>Kirim</button>
            </form>
          ) : (
            <p className='thread-comment__not_login'>
              <Link to='/login'>Login</Link> untuk memberi komentar
            </p>
          )}
        </div>

        {/* Comment List */}
        <div className='thread-comment__list'>
          <h3>Komentar ({threadDetail.comments.length})</h3>

          <div className='comments-list'>
            {/* Comment Item */}
            {threadDetail.comments.length > 0 && threadDetail.comments.map((comment) =>(
              <div className='comment-item' key={comment.id}>
                <header className='comment-item__header'>
                  <div className='comment-item__owner-info'>
                    <img
                      src={comment.owner.avatar}
                      alt={comment.owner.name}
                    />
                    <p>{comment.owner.name}</p>
                  </div>
                  <p>{calculateDate(comment.createdAt)}</p>
                </header>

                <p dangerouslySetInnerHTML={{ __html:comment.content }} />

                <footer>
                  <button type='button' className='comment-upvote__button' onClick={()=>vote('up', { threadId: threadDetail.id, commentId: comment.id })}>
                    <Like />
                    <span className='comment-upvote__label'>{comment.upVotesBy.length}</span>
                  </button>

                  <button type='button' className='comment-downvote__button' onClick={()=>vote('down', { threadId: threadDetail.id, commentId: comment.id })}>
                    <DisLike />
                    <span className='comment-downvote__label'>{comment.downVotesBy.length}</span>
                  </button>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

ThreadComment.propTypes = {
  onSubmitComment: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired
};

export default ThreadComment;
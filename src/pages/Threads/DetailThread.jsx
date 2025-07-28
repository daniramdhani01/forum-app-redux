import { useEffect } from 'react';
// import data from './detailThread-dummy.json'
import { useDispatch, useSelector } from 'react-redux';
import { getThreads } from '../../redux/action';
import { Link, useParams } from 'react-router-dom';
import { calculateDate } from '../../utils/date';

function DetailThread() {
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const { threadDetail } = useSelector((state) => state.app);

  useEffect(()=>{
    dispatch(getThreads(id));
  }, []);

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
        <button type='button' className='thread-upvote__button'>
          <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
            <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
            <path d='M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z'></path>
          </svg>
          <span className='thread-upvote__label'>{threadDetail.upVotesBy.length}</span>
        </button>

        <button type='button' className='thread-downvote__button'>
          <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
            <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
            <path d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z'></path>
          </svg>
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

      {/* Thread Comments Section */}
      <div className='thread-comment'>
        {/* Comment Input */}
        <div className='thread-comment__input'>
          <h3>Beri komentar</h3>
          <p className='thread-comment__not_login'>
            <Link to='/login'>Login</Link> untuk memberi komentar
          </p>
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
                  <p>{calculateDate(threadDetail.createdAt)}</p>
                </header>

                <p dangerouslySetInnerHTML={{ __html:comment.content }} />

                <footer>
                  <button type='button' className='comment-upvote__button'>
                    <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                      <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
                      <path d='M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z'></path>
                    </svg>
                    <span className='comment-upvote__label'>{comment.upVotesBy.length}</span>
                  </button>

                  <button type='button' className='comment-downvote__button'>
                    <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                      <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
                      <path d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z'></path>
                    </svg>
                    <span className='comment-downvote__label'>{comment.downVotesBy.length}</span>
                  </button>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailThread;
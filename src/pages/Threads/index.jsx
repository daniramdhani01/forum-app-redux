import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateDate } from '../../utils/date';
import { clearThreads, threadsService } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Add } from '../../icons/add.svg';
import { ReactComponent as Like } from '../../icons/like.svg';
import { ReactComponent as DisLike } from '../../icons/disLike.svg';
import { ReactComponent as LikeSolid } from '../../icons/likeSolid.svg';
import { ReactComponent as DisLikeSolid } from '../../icons/disLikeSolid.svg';
import { ReactComponent as ArrowLeft } from '../../icons/arrowLeft.svg';

function Threads() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threads: threadsList, allUser, isLogin, myProfile } = useSelector((state) => state.app);
  const [selectedCategory, setSelectedCategory] = useState('');

  const threads  = useMemo(()=>{
    if (!selectedCategory) return threadsList;
    const newThreads =  threadsList.filter((item) => item.category === selectedCategory);
    return newThreads;
  }, [selectedCategory, threadsList]);

  const categorys = useMemo(()=>{
    const newCategory = new Map(threadsList.map((item) => [item.category, item.category])).values();
    return Array.from(newCategory);
  }, [threadsList]);

  const isMyVote = useCallback((arrayVote = [])=>{
    if (!myProfile.id) return false;

    return arrayVote.includes(myProfile.id);
  }, [threads, myProfile]);

  const handleVote = async (vote, threadId)=>{
    console.log('daniw', vote, threadId);
  };

  useEffect(()=>{
    dispatch(threadsService.fetch());
    return ()=> dispatch(clearThreads());
  }, [dispatch]);

  return (
    <section className='home-page'>
      <header>
        <p>Kategori popular</p>
        <div className='categories-list'>
          {categorys.map((category) => (
            <button
              key={`${category}-categori`}
              className={`category-item ${selectedCategory === category && 'selected'}`}
              onClick={()=>setSelectedCategory((prev)=> prev === category ? '' : category)}
            >
                #{category}
            </button>
          ))}
        </div>
      </header>

      <div className='home-page__content'>
        <h2>Diskusi tersedia</h2>

        <div className='threads-list'>
          {/* Thread Item 1 */}
          {threads.map((thread) => (
            <div className='thread-item' key={thread.id}>
              <header className='thread-item__header'>
                <span className='thread-item__category'>#{thread.category}</span>
                <h4 className='thread-item__title'>
                  <Link to={`threads/${thread.id}`}>{thread.title}</Link>
                </h4>
              </header>

              <div className='thread-item__body' dangerouslySetInnerHTML={{ __html: thread.body }} />

              <footer className='thread-item__footer'>
                <button type='button' className='thread-upvote__button' onClick={()=>isMyVote(thread.upVotesBy) ? handleVote('up', thread.id) : handleVote('neutral', thread.id)}>
                  {isMyVote(thread.upVotesBy) ? <LikeSolid /> : <Like />}
                  <span className='thread-upvote__label'>{thread.upVotesBy.length}</span>
                </button>

                <button type='button' className='thread-downvote__button' onClick={()=>isMyVote(thread.upVotesBy) ? handleVote('down', thread.id) : handleVote('neutral', thread.id)}>
                  {isMyVote(thread.downVotesBy) ? <DisLikeSolid /> : <DisLike />}
                  <span className='thread-downvote__label'>{thread.downVotesBy.length}</span>
                </button>

                <p className='thread-item__total-comments'>
                  <ArrowLeft />
                  {thread.totalComments}
                </p>

                <p>{calculateDate(thread.createdAt)}</p>
                <p className='thread-item__owner'>Dibuat oleh <strong>{allUser?.find((item) => thread.ownerId === item.id)?.name}</strong></p>
              </footer>
            </div>
          ))}
        </div>
      </div>
      {isLogin && (<button className='new-thread-button' onClick={()=>navigate('/new')}><Add /></button>)}
    </section>
  );
}

export default Threads;
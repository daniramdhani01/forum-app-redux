import React, { useEffect } from 'react'
// import data from './threads-dummy.json'
import { Link } from 'react-router'
import { calculateDate } from '../../utils/date'
import { getAllUser, getThreads } from '../../redux/action'
import { useDispatch, useSelector } from 'react-redux'

function Threads() {
  const dispatch = useDispatch()
  const { threads, allUser } = useSelector(state => state.app)

  useEffect(()=>{
    dispatch(getThreads())
  },[])

  return (
    <section className='home-page'>
    <header>
        <p>Kategori popular</p>
        <div className='categories-list'>
            {threads.map(thread => (
            <button type='button' className='category-item' key={thread.id+'categori'}>
                <p>#{thread.category}</p>
            </button>
            ))}
        </div>
    </header>

    <div className='home-page__content'>
        <h2>Diskusi tersedia</h2>
        
        <div className='threads-list'>
            {/* Thread Item 1 */}
            {threads.map(thread => (
            <div className='thread-item' key={thread.id}>
                <header className='thread-item__header'>
                    <span className='thread-item__category'>#{thread.category}</span>
                    <h4 className='thread-item__title'>
                        <Link to={'threads/'+thread.id}>{thread.title}</Link>
                    </h4>
                </header>
                
                <div className='thread-item__body' dangerouslySetInnerHTML={{__html: thread.body}} />
                
                <footer className='thread-item__footer'>
                    <button type='button' className='thread-upvote__button'>
                        <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
                            <path d='M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z'></path>
                        </svg>
                        <span className='thread-upvote__label'>{thread.upVotesBy.length}</span>
                    </button>
                    
                    <button type='button' className='thread-downvote__button'>
                        <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='none' d='M0 0h24v24H0V0z' opacity='.87'></path>
                            <path d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z'></path>
                        </svg>
                        <span className='thread-downvote__label'>{thread.downVotesBy.length}</span>
                    </button>
                    
                    <p className='thread-item__total-comments'>
                        <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 16 16' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z'></path>
                        </svg> {thread.totalComments}
                    </p>
                    
                    <p>{calculateDate(thread.createdAt)} hari lalu</p>
                    <p className='thread-item__owner'>Dibuat oleh <strong>{allUser?.find(item => thread.ownerId === item.id)?.name}</strong></p>
                </footer>
            </div>
            ))}
        </div>
    </div>
    </section>
  )
}

export default Threads
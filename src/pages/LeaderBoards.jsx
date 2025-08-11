import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearLeaderboard, leaderboardService } from '../redux/action';
import { abortManager } from '../api/abortManager';

function LeaderBoards() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((state) => state.app);

  useEffect(()=>{
    dispatch(leaderboardService.fetch());

    return ()=>{
      abortManager.abortAll();
      dispatch(clearLeaderboard());
    };
  }, [dispatch]);

  return (
    <div className='board-page'>
      <h2>Klasmen Pengguna Aktif</h2>
      <div className='leaderboards-list'>
        <header>
          <p className='leaderboards-list__user-label'>Pengguna</p>
          <p className='leaderboards-list__score-label'>Skor</p>
        </header>

        {leaderboards.map((leaderboard)=>(
          <div className='leaderboard-item' key={leaderboard.user.email}>
            <div className='leaderboard-item__user-info'>
              <img
                src={leaderboard.user.avatar}
                alt={leaderboard.user.name}
              />
              <p>{leaderboard.user.name}</p>
            </div>
            <p className='leaderboard-item__score'>{leaderboard.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderBoards;
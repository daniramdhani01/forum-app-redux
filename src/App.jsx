import { Route, Routes } from 'react-router';
import NavigationButton from './components/NavigationButton';
import { lazy, Suspense } from 'react';
import DetailThread from './pages/Threads/DetailThread';
import LoadingBar from 'react-redux-loading-bar';

const Threads = lazy(()=>import('./pages/Threads'))
const LeaderBoards = lazy(()=>import('./pages/LeaderBoards'))
const Login = lazy(()=>import('./pages/Login'))
const Register = lazy(()=>import('./pages/Register'))

function App() {
  return (
    <div className='app'>
      <header>
        <div className='loading'>
          <LoadingBar/>
        </div>
        <div className='top-bar'>
          <h1>Dicoding Forum App</h1>
        </div>
      </header>
      <main>
        <Suspense fallback={<>loading...</>}>
          <Routes>
            <Route path='/' element={<Threads/>}/>
            <Route path='threads/:id' element={<DetailThread/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='leaderboards' element={<LeaderBoards/>}/>
            <Route path='*' element={<h1>404: Not Found</h1>}/>
          </Routes>
        </Suspense>
      </main>
      <footer>
        <NavigationButton/>
      </footer>
    </div>
  );
}

export default App;

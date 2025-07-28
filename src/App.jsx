import React, { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import DetailThread from './pages/Threads/DetailThread';
import DefaultLayout from './components/DefaultLayout';
import { useSelector } from 'react-redux';
import nProgress from 'nprogress';
import New from './pages/New';

const Threads = lazy(()=>import('./pages/Threads'));
const LeaderBoards = lazy(()=>import('./pages/LeaderBoards'));
const Login = lazy(()=>import('./pages/Login'));
const Register = lazy(()=>import('./pages/Register'));

function App() {
  const { isLogin, globalLoading } = useSelector((state) => state.app);

  useEffect(()=>{
    if (globalLoading) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [globalLoading]);

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout><Threads/></DefaultLayout>}/>
      <Route path='threads/:id' element={<DefaultLayout><DetailThread/></DefaultLayout>}/>
      <Route path='leaderboards' element={<DefaultLayout><LeaderBoards/></DefaultLayout>}/>

      <Route path='new' element={isLogin ? <DefaultLayout><New/></DefaultLayout> : <Navigate to='/'/>}/>

      <Route path='login' element={!isLogin ? <DefaultLayout><Login/></DefaultLayout> : <Navigate to='/'/>}/>
      <Route path='register' element={!isLogin ? <DefaultLayout><Register/></DefaultLayout> : <Navigate to='/'/>}/>
      <Route path='*' element={<DefaultLayout><h1>404: Not Found</h1></DefaultLayout>}/>
    </Routes>
  );
}

export default App;

import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts/auth';
import LoginPage from './pages/auth/LoginPage';
import ChatPage from './pages/chat/ChatPage';
import { APP_ID } from './secret';
import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';

function MainRouter() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/LostInTranslator">
      <Routes>
        <Route
          path='/login'
          element={user.userId ? <Navigate replace to='/' /> : <LoginPage />}
        />
        <Route
          path='/'
          element={
            user.userId ? 
            <SendbirdApp appId={APP_ID} userId={user.userId}/> : 
            <Navigate replace to='/login' />
          }
        />
        <Route
          path='/chat'
          element={
            user.userId ? <ChatPage /> : <Navigate replace to='/login' />
          }
        />
        <Route path='/*' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;

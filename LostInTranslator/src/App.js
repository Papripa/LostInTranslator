import React from 'react';
import './App.css';
import './global/pages.css';
import ContextProvider from './contexts/ContextProvider';
import MainRouter from './MainRouter';
import InitSendbird from './components/InitSendbird';

function App() {
  return (
    <div className='App' id='app__wrap'>
      <ContextProvider>
        <InitSendbird>
          <MainRouter />
        </InitSendbird>
      </ContextProvider>
    </div>
  );
}

export default App;

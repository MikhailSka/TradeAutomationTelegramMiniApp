import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TelegramProvider from './context/Telegram/TelegramProvider';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <TelegramProvider>
      <App />
    </TelegramProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
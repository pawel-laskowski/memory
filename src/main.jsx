import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { SettingsProvider } from './store/settings-context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SettingsProvider>
);

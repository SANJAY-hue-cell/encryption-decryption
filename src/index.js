import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import EDProvider from './context/EncryptDecryptionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EDProvider>
      <App />
    </EDProvider>
  </React.StrictMode>
);

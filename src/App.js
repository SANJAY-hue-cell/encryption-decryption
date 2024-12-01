import React from 'react' ;
import './App.css' ;
import EncryptDecrypt from './components/EncryptDecrypt' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EncryptDetails from './components/EncryptDetails';

function App() {
  return (
      <>
      <EncryptDecrypt />
      </>
  )
}

export default App
import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { ENV_VARS } from './utils/env';

function App() {
  return (
    <div className="App">
      <HomePage dataUrl={ENV_VARS.SOURCE_URL}></HomePage>
    </div>
  )
}

export default App;

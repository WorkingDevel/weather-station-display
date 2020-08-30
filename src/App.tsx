import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { ENV_VARS } from './utils/env';
import store from './store';
import { timeSlice } from './store/time/slice';

function App() {
  useEffect(() => {
    // persistor.purge();

    setInterval(() => {
      store.dispatch(timeSlice.actions.setLocalTime(new Date().toISOString()));
    }, 1000);
  }, []);

  return (
    <div className="App">
      <HomePage dataUrl={ENV_VARS.SOURCE_URL}></HomePage>
    </div>
  )
}

export default App;

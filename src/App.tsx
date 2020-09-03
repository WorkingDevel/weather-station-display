import React, { useEffect } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { ENV_VARS } from './utils/env';
import store from './store';
import { timeSlice } from './store/time/slice';
import { ActionID } from './store/actions';

function App() {
  useEffect(() => {
    // persistor.purge();

    setInterval(() => {
      store.dispatch(timeSlice.actions.setLocalTime(new Date().toISOString()));
    }, 1000);
    setInterval(() => {
      store.dispatch({ type: ActionID.FETCH_STATION_DATA_REQUEST });
    }, 5000);

  }, []);

  return (
    <div className="App">
      <HomePage dataUrl={ENV_VARS.SOURCE_URL}></HomePage>
    </div>
  )
}

export default App;

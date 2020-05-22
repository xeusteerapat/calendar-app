import React from 'react';
import Main from './components/Main';
import AppState from './context/App/AppState';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './App.css';

const App = () => {
  return (
    <>
      <AppState>
        <Main />
      </AppState>
    </>
  );
};

export default App;

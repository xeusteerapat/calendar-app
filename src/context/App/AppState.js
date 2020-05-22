import React, { useReducer } from 'react';
import { rootReducer } from './appReducer';
import AppContext from './appContext';
import { ADD_EVENT } from '../types';

const AppState = ({ children }) => {
  const initialState = {
    events: [],
    colors: ['Primary', 'Success', 'Info', 'Warning', 'Danger'],
    selectedEvent: {}
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);

  const addEvent = event => {
    let userEvents = [...state.events];
    userEvents.push(event);
    dispatch({
      type: ADD_EVENT,
      payload: userEvents
    });
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        colors: state.colors,
        selectedEvent: state.selectedEvent,
        addEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

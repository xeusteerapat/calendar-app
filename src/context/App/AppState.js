import React, { useReducer } from 'react';
import { rootReducer } from './appReducer';
import AppContext from './appContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ADD_EVENT, GET_EVENTS } from '../types';

const AppState = ({ children }) => {
  const initialState = {
    events: [],
    colors: ['Primary', 'Success', 'Info', 'Warning', 'Danger'],
    selectedEvent: {}
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [eventItem, setEventItem] = useLocalStorage('events');

  const addEvent = event => {
    let userEvents = [...state.events];

    userEvents.push(event);

    setEventItem(userEvents);

    dispatch({
      type: ADD_EVENT,
      payload: userEvents
    });
  };

  // Fetch all events from storage
  const getEvents = () => {
    if (eventItem) {
      dispatch({
        type: GET_EVENTS,
        payload: eventItem
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        colors: state.colors,
        selectedEvent: state.selectedEvent,
        addEvent,
        getEvents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

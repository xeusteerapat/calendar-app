import React, { useReducer } from 'react';
import { rootReducer } from './appReducer';
import AppContext from './appContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  ADD_EVENT,
  GET_EVENTS,
  SELECTED_EVENT,
  EDIT_EVENT,
  DELETE_EVENT
} from '../types';

const AppState = ({ children }) => {
  const initialState = {
    events: [],
    colors: ['Primary', 'Success', 'Info', 'Warning', 'Danger'],
    selectedEvent: {},
    colorObj: {
      primary: '#0275d8',
      success: '#5cb85c',
      info: '#5bc0de',
      warning: '#f0ad4e',
      danger: '#d9534f'
    }
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const [eventItem, setEventItem] = useLocalStorage('events');
  const [selectedItem, setSelectedItem] = useLocalStorage('selectedEvent');

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

  const selected = event => {
    setSelectedItem(event);
    dispatch({
      type: SELECTED_EVENT,
      payload: event
    });
  };

  const editSelectedEvent = event => {
    // we got eventItem from localstorage then map through updated event
    const newUpdatedEvents = eventItem.map(item => {
      return item.id === event.id ? event : item;
    });

    // then update updated event to localstorage
    setEventItem(newUpdatedEvents);

    dispatch({
      type: EDIT_EVENT,
      payload: newUpdatedEvents
    });
  };

  const deleteSelectedEvent = event => {
    const updatedEvents = eventItem.filter(item => item.id !== event.id);

    setEventItem(updatedEvents);

    dispatch({
      type: DELETE_EVENT,
      payload: updatedEvents
    });
    // also delete selected event in localstorage
    dispatch({
      type: SELECTED_EVENT,
      payload: {}
    });
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        colors: state.colors,
        selectedEvent: state.selectedEvent,
        colorObj: state.colorObj,
        addEvent,
        getEvents,
        selected,
        editSelectedEvent,
        deleteSelectedEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

import React, { useReducer } from 'react';
import _ from 'lodash';
import { rootReducer } from './appReducer';
import AppContext from './appContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  ADD_EVENT,
  GET_EVENTS,
  SELECTED_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  ACTIVE_EVENTS
} from '../types';

const AppState = ({ children }) => {
  const initialState = {
    events: [],
    colors: ['Primary', 'Success', 'Info', 'Warning', 'Danger'],
    selectedEvent: {},
    activeCalendarEvents: [],
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
  const [, setSelectedItem] = useLocalStorage('selectedEvent');
  const [activeEventsItem, setActiveEventsItem] = useLocalStorage(
    'activeCalendarEvents'
  );

  const activeEvents = event => {
    let calendarEvents = [...state.activeCalendarEvents];
    calendarEvents.push(event);

    const activeEventsArray = _.uniqBy(calendarEvents, 'id');
    setActiveEventsItem(activeEventsArray);

    dispatch({
      type: ACTIVE_EVENTS,
      payload: activeEventsArray
    });
  };

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

    const activeEventsArray = activeEventsItem.filter(
      evt => evt.id !== event.id
    );
    setActiveEventsItem(activeEventsArray);

    dispatch({
      type: ACTIVE_EVENTS,
      payload: activeEventsArray
    });
  };

  return (
    <AppContext.Provider
      value={{
        events: state.events,
        colors: state.colors,
        selectedEvent: state.selectedEvent,
        activeCalendarEvents: state.activeCalendarEvents,
        colorObj: state.colorObj,
        addEvent,
        getEvents,
        selected,
        editSelectedEvent,
        deleteSelectedEvent,
        activeEvents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

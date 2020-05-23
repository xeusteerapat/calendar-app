import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/App/appContext';
import moment from 'moment';

import './Toast.css';

const Toast = () => {
  const appContext = useContext(AppContext);
  const {
    activeEvents,
    events,
    activeCalendarEvents,
    deleteSelectedEvent,
    selected
  } = appContext;

  useEffect(() => {
    const interval = setInterval(() => {
      addEvent();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [events]);

  const addEvent = () => {
    if (events.length) {
      for (const event of events) {
        const startEventDate = `${moment(new Date(event.start)).format(
          'YYYY-MM-DDTHH:mm'
        )}`;
        const now = moment(new Date()).format('YYYY-MM-DDTHH:mm');

        if (now === startEventDate) {
          activeEvents(event);
        }
      }
    }
  };

  // maybe it's not necessary
  const deleteEvent = event => {
    deleteSelectedEvent(event);
    selected({});
  };

  return (
    <>
      <div className="notification-container notification-top-right">
        {activeCalendarEvents.map((evt, idx) => (
          <div
            key={idx}
            className="notification toast"
            style={{
              backgroundColor: evt.backgroundColor
            }}
          >
            <button onClick={() => deleteEvent(evt)}>X</button>
            <p className="notification-title">{evt.title}</p>
            <p className="notification-subtitle">
              Overdue {moment(evt.start).fromNow()}
            </p>
            <p className="notification-message">{evt.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;

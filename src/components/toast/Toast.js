import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/App/appContext';
import moment from 'moment';

import './Toast.css';

const Toast = () => {
  const appContext = useContext(AppContext);
  const { activeEvents, events } = appContext;

  useEffect(() => {
    addEvent();
  }, []);

  console.log(events[0]);
  console.log(
    'from event 0',
    moment(new Date('2020-05-23')).format('YYYY-MM-DDTHH:ss')
  );
  console.log('now', moment(new Date()).format('YYYY-MM-DDTHH:ss'));

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

  return (
    <>
      <div className="notification-container notification-top-right">
        <div
          className="notification toast"
          style={{
            backgroundColor: 'teal'
          }}
        >
          <button>X</button>
          <p className="notification-title">Notification Title</p>
          <p className="notification-subtitle">Overdue 5 minutes ago</p>
          <p className="notification-message">This is a description</p>
        </div>
      </div>
    </>
  );
};

export default Toast;

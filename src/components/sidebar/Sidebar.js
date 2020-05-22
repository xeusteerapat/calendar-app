import React, { useContext } from 'react';
import AddEvent from '../modals/AddEvent';
import AppContext from '../../context/App/appContext';

const Sidebar = () => {
  const appContext = useContext(AppContext);
  const { events } = appContext;
  return (
    <div className="col-lg-3">
      <button
        className="btn btn-primary btn-block"
        data-toggle="modal"
        data-target="#add-event"
      >
        Create New Event
      </button>
      <div className="m-t-20">
        <br />
        {events.length > 0
          ? events.map((event, index) => (
              <div
                key={event.id + index}
                className={`external-event bg-${event.bgColor}`}
              >
                {event.title}
              </div>
            ))
          : 'No event just yet'}
      </div>
      <AddEvent />
    </div>
  );
};

export default Sidebar;

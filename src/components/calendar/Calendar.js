import React, { useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import AppContext from '../../context/App/appContext';

const Calendar = () => {
  const appContext = useContext(AppContext);
  const { events, getEvents, selected } = appContext;

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [events]);

  const handleEventClick = info => {
    const event = events.find(e => e.id === info.event.id);
    selected(event);
    info.el.setAttribute('data-toggle', 'modal');
    info.el.setAttribute('data-target', '#selection-modal');
  };

  return (
    <div className="col-lg-9">
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth, timeGridWeek, timeGridDay'
          }}
          events={events} // left side in full calendar props, right side are events from state
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;

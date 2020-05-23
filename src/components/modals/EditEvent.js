import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const EditEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [showtime, setShowtime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const appContext = useContext(AppContext);
  const {
    events,
    colors,
    selectedEvent,
    colorObj,
    editSelectedEvent
  } = appContext;

  useEffect(() => {
    if (Object.keys(selectedEvent).length > 0) {
      setColor(selectedEvent.bgColor);
      setEventName(selectedEvent.title);
      setDescription(selectedEvent.description);
      setCheckbox(selectedEvent.allDay);

      let start = `${moment(new Date(selectedEvent.start)).format()}`;
      let end = '';

      if (!selectedEvent.allDay) {
        setShowtime(false);
        end = `${moment(new Date(selectedEvent.end)).format()}`;
      } else {
        setShowtime(true);
        end = `${moment(new Date(selectedEvent.end)).format('YYYY-MM-DD')}`;
      }
      setStartDate(new Date(start));
      setEndDate(new Date(end));
    }
    // eslint-disable-next-line
  }, [selectedEvent, events]);

  const inputChange = e => {
    const attrName = e.target.getAttribute('name');

    if (attrName === 'event-name') {
      setEventName(e.target.value);
    }

    if (attrName === 'description') {
      setDescription(e.target.value);
    }
  };

  const onDateChange = timeInput => event => {
    if (timeInput === 'startdate') {
      setStartDate(event);
    }
    if (timeInput === 'enddate') {
      setEndDate(event);
    }
  };

  const onCheckBoxChange = e => {
    if (e.target.checked) {
      setShowtime(true);
      setCheckbox(true);
    } else {
      setShowtime(false);
      setCheckbox(false);
    }
  };

  const handleColorChange = e => {
    if (e.target.value !== 'Select Color') {
      setColor(e.target.value);
    } else {
      setColor('');
    }
  };

  const editEvent = () => {
    const event = setEvent(selectedEvent.id);
    editSelectedEvent(event);
  };

  const setEvent = id => {
    let start = `${moment(startDate).format()}`;
    let end = '';
    if (!checkbox) {
      end = `${moment(endDate).format()}`;
    } else {
      end = `${moment(endDate).format('YYYY-MM-DD')}`;
    }

    const event = {
      id,
      title: eventName,
      description,
      start,
      end,
      allDay: checkbox,
      bgColor: color,
      backgroundColor: colorObj[color]
    };

    return event;
  };

  const closeModal = () => {};

  return (
    <>
      <EventForm
        modalId="edit-event"
        title="Edit Event"
        description={description}
        closeModal={closeModal}
        eventName={eventName}
        inputChange={inputChange}
        checkbox={checkbox}
        onCheckBoxChange={onCheckBoxChange}
        showtime={showtime}
        startDate={startDate}
        endDate={endDate}
        onDateChange={onDateChange}
        color={color}
        colors={colors}
        colorObj={colorObj}
        handleColorChange={handleColorChange}
        eventType={editEvent}
        buttonText="Update"
      />
    </>
  );
};

export default EditEvent;

import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';

const EditEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [showtime, setShowtime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const appContext = useContext(AppContext);
  const { events, colors, selectedEvent } = appContext;

  const colorObj = {
    primary: '#0275d8',
    success: '#5cb85c',
    info: '#5bc0de',
    warning: '#f0ad4e',
    danger: '#d9534f'
  };

  useEffect(() => {
    if (Object.keys(selectedEvent).length) {
      setColor(selectedEvent.bgColor);
      setEventName(selectedEvent.title);
      setCheckbox(selectedEvent.allDay);

      let start = '';
      let end = '';

      if (!selectedEvent.allDay) {
        setShowtime(false);
        start = `${moment(new Date(selectedEvent.start)).format()}`;
        end = `${moment(new Date(selectedEvent.end)).format()}`;
      } else {
        setShowtime(true);
        start = `${moment(new Date(selectedEvent.start)).format('YYYY-MM-DD')}`;
        end = `${moment(new Date(selectedEvent.end)).format('YYYY-MM-DD')}`;
      }
      setStartDate(new Date(start));
      setEndDate(new Date(end));
    }
    // eslint-disable-next-line
  }, [selectedEvent, events]);

  const inputChange = e => {
    setEventName(e.target.value);
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

  const editEvent = () => {};

  const setEvent = id => {
    let start = '';
    let end = '';
    if (!checkbox) {
      start = `${moment(startDate).format()}`;
      end = `${moment(endDate).format()}`;
    } else {
      start = `${moment(startDate).format('YYYY-MM-DD')}`;
      end = `${moment(endDate).format('YYYY-MM-DD')}`;
    }

    const event = {
      id,
      title: eventName,
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
        handleColorChange={handleColorChange}
        eventType={editEvent}
        buttonText="Update"
      />
    </>
  );
};

export default EditEvent;

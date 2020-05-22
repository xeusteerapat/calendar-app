import React, { useState } from 'react';
import moment from 'moment';
import EventForm from './EventForm';

const AddEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [showtime, setShowtime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const colors = ['Primary', 'Success', 'Info', 'Warning', 'Danger'];
  const colorObj = {
    primary: '#0275d8',
    success: '#5cb85c',
    info: '#5bc0de',
    warning: '#f0ad4e',
    danger: '#d9534f'
  };

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

  const createEventType = () => {
    const event = setEvent(1);
    console.log(event);
    reset();
  };

  const reset = () => {
    setColor('');
    setEventName('');
    setCheckbox(false);
    setShowtime(false);
    setStartDate(new Date());
    setEndDate(new Date());
  };

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
      bgColor: color,
      backgroundColor: colorObj[color]
    };

    return event;
  };

  const closeModal = () => {
    reset();
  };

  return (
    <div>
      <EventForm
        modalId="add-event"
        title="Add Event"
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
        eventType={createEventType}
        buttonText="Save"
      />
    </div>
  );
};

export default AddEvent;

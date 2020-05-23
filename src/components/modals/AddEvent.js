import React, { useState, useContext } from 'react';
import moment from 'moment';
import EventForm from './EventForm';
import AppContext from '../../context/App/appContext';
import { v4 as uuid } from 'uuid';

const AddEvent = () => {
  const [color, setColor] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [showtime, setShowtime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const appContext = useContext(AppContext);
  const { addEvent, colors, colorObj } = appContext;

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

  const createEvent = () => {
    const event = setEvent(uuid());
    addEvent(event);
    reset();
  };

  const reset = () => {
    setColor('');
    setEventName('');
    setDescription('');
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
      description,
      start,
      end,
      allDay: checkbox,
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
        eventType={createEvent}
        buttonText="Save"
      />
    </div>
  );
};

export default AddEvent;

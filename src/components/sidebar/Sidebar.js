import React from 'react';
import AddEvent from '../modals/AddEvent';

const Sidebar = () => {
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
        <div className="external-event bg-primary">Learn React</div>
        <div className="external-event bg-danger">Learn Graphql</div>
        <div className="external-event bg-success">Learn Typescript</div>
      </div>
      <AddEvent />
    </div>
  );
};

export default Sidebar;

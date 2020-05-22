import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = () => {
  return (
    <div>
      <div id="add-event" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New Event</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-3">
              <form>
                <div className="form-group">
                  <label htmlFor="" className="control-label">
                    Event Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-white"
                    placeholder="Enter Title"
                    name="event-name"
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkbox"
                  />
                  <label htmlFor="" className="control-label">
                    All day Event? (optional)
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="">Start</label>
                  <div className="row">
                    <div className="col-md-12">
                      <DatePicker
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={5}
                        dateFormat="Pp"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">End</label>
                  <div className="row">
                    <div className="col-md-12">
                      <DatePicker
                        showTimeSelect
                        timeFormat="p"
                        timeIntervals={5}
                        dateFormat="Pp"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="" className="control-label">
                    Choose event tag color
                  </label>
                  <select>
                    <option value="">Select Color</option>
                    <option value="">Primary</option>
                    <option value="">Info</option>
                    <option value="">Success</option>
                    <option value="">Danger</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = props => {
  const {
    modalId,
    title,
    description,
    closeModal,
    eventName,
    inputChange,
    checkbox,
    onCheckBoxChange,
    showtime,
    startDate,
    endDate,
    onDateChange,
    color,
    colors,
    colorObj,
    handleColorChange,
    eventType,
    buttonText
  } = props;
  return (
    <div>
      <div id={modalId} className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-secondary">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <div className="modal-body p-3 bg-secondary">
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
                    value={eventName}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="control-label">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control form-white"
                    placeholder="Enter Description"
                    name="description"
                    value={description}
                    onChange={inputChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkbox"
                    value={checkbox}
                    checked={checkbox}
                    onChange={onCheckBoxChange}
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
                        className="form-control"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="Pp"
                        selected={startDate}
                        onChange={onDateChange('startdate')}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">End</label>
                  <div className="row">
                    {!showtime ? (
                      <div className="col-md-12">
                        <DatePicker
                          className="form-control"
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          dateFormat="Pp"
                          selected={endDate}
                          onChange={onDateChange('enddate')}
                        />
                      </div>
                    ) : (
                      <div className="col-md-12">
                        <DatePicker
                          className="form-control"
                          selected={endDate}
                          onChange={onDateChange('enddate')}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="" className="control-label">
                    Choose event tag color
                  </label>
                  <select
                    className="form-control form-white"
                    name="event-color"
                    onChange={handleColorChange}
                    value={color}
                    style={{
                      backgroundColor: colorObj[color]
                    }}
                  >
                    <option value="">Select Color</option>
                    {colors.map(color => (
                      <option key={color} value={color.toLowerCase()}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary save"
                data-dismiss="modal"
                onClick={eventType}
                disabled={!eventName || !startDate || !endDate || !color}
              >
                {buttonText}
              </button>
              <button
                type="button"
                className="btn btn-danger cancel"
                data-dismiss="modal"
                onClick={closeModal}
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

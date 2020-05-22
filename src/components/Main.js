import React from 'react';
import Calendar from './calendar/Calendar';
import Sidebar from './sidebar/Sidebar';

const Main = () => {
  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <Sidebar />
                  <Calendar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

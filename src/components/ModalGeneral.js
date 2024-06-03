import React from 'react';
import { calculateDeviation, formatTime, formatScheduledTime } from './utils';
import './modal.css';

const ModalGeneral = ({ closeModal, rowData }) => {
  const deviation = calculateDeviation(rowData.arrT, rowData.schd_time);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> x </button>
        </div>
        <div className="title">
          <h1>Run {rowData.runid}</h1>
        </div>
        <div className="body">
          <table className="modalTable">
            <tbody>
              <tr>
                <td><strong>Adjusted:</strong></td>
                <td>{rowData.adjusted ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Vehicle ID:</strong></td>
                <td>{rowData.vehicle_id}</td>
              </tr>
              <tr>
                <td><strong>Driver ID:</strong></td>
                <td>{rowData.driver_id}</td>
              </tr>
              <tr>
                <td><strong>Prediction Time:</strong></td>
                <td>{formatTime(rowData.prdt)}</td>
              </tr>
              <tr>
                <td><strong>Scheduled Time:</strong></td>
                <td>{formatScheduledTime(rowData.schd_time)}</td>
              </tr>
              <tr>
                <td><strong>Scheduled Deviation:</strong></td>
                <td>{deviation} min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModalGeneral;

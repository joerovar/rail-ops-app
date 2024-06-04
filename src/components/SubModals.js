import React, { useState } from 'react';
import { calculateTimeUntilArrival, formatTime, formatScheduledTime, pushInfo } from './utils';
import Modal from './Modal';
import API_URLS from '../config';

export const ModalRail = (props) => {
  const { rowData, stationName } = props;
  const pushUrl = `${API_URLS.PUSH_RAIL}`;

  const [showInputForm, setShowInputForm] = useState(false);
  const [selectedField, setSelectedField] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleAddInfoClick = () => {
    setShowInputForm(true);
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    const runId = rowData.runid.slice(-3); // Slice the last three characters of runid
    await pushInfo(pushUrl, runId, stationName, selectedField, inputValue);
    setShowInputForm(false);
    setInputValue('');
  };

  const timeUntilArrival = calculateTimeUntilArrival(rowData.arrT);
  const scheduledHeadwayMinutes = Math.ceil(rowData.schd_headway / 60); // Convert seconds to minutes

  return (
    <Modal
      closeModal={props.closeModal}
      rowData={rowData}
      pushUrl={pushUrl}
      title={`Run ${rowData.runid}`}
      stationName={stationName}
    >
      <div className="buttonContainer">
        <button onClick={handleAddInfoClick} className="addInfoButton">Add Info</button>
      </div>
      {showInputForm && (
        <div className="inputForm">
          <label htmlFor="field">Field:</label>
          <select id="field" value={selectedField} onChange={handleFieldChange}>
            <option value="">Select a field</option>
            <option value="driver_id">Driver ID</option>
            <option value="vehicle_id">Vehicle ID</option>
            <option value="comments">Comments</option>
          </select>
          <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter value" />
          <button onClick={handleSubmit} className="submitButton">Submit</button>
        </div>
      )}
      <div className="bodySection">
        <table className="modalTable">
          <tbody>
            <tr>
              <td><strong>Time:</strong></td>
              <td>{formatTime(rowData.arrT)}</td>
            </tr>
            <tr>
              <td><strong>Time Until:</strong></td>
              <td>{timeUntilArrival} minutes</td>
            </tr>
            <tr>
              <td><strong>Schd. Time:</strong></td>
              <td>{formatScheduledTime(rowData.schd_time)}</td>
            </tr>
            <tr>
              <td><strong>Adjusted:</strong></td>
              <td>{rowData.adjusted ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Comments:</strong></td>
              <td>{rowData.comments}</td>
            </tr>
            <tr>
              <td><strong>Driver ID:</strong></td>
              <td>{rowData.driver_id}</td>
            </tr>
            <tr>
              <td><strong>Vehicle ID:</strong></td>
              <td>{rowData.vehicle_id}</td>
            </tr>
            <tr>
              <td><strong>Prediction Generated:</strong></td>
              <td>{formatTime(rowData.prdt)}</td>
            </tr>
            <tr>
              <td><strong>Is Approaching:</strong></td>
              <td>{rowData.isApp === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Is Delayed:</strong></td>
              <td>{rowData.isDly === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Is Fault:</strong></td>
              <td>{rowData.isFlt === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Scheduled Interval:</strong></td>
              <td>{rowData.schInt} minutes</td>
            </tr>
            <tr>
              <td><strong>Scheduled Headway:</strong></td>
              <td>{scheduledHeadwayMinutes} minutes</td>
            </tr>
            <tr>
              <td><strong>Trip Number:</strong></td>
              <td>{rowData.tripno}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

import React from 'react';
import { calculateTimeUntilArrival, formatTime, formatScheduledTime } from './utils';
import Modal from './Modal';
import API_URLS from '../config';

export const ModalRail = (props) => {
  const { rowData, stationName } = props;
  const runId = rowData.rn; // Use the pre-sliced value directly
  const pushUrl = `${API_URLS.PUSH_RAIL}?runid=${runId}`;

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
      <div className="bodySection">
        <ul>
          <li><strong>Time:</strong> {formatTime(rowData.arrT)}</li>
          <li><strong>Time Until:</strong> {timeUntilArrival} minutes</li>
          <li><strong>Schd. Time:</strong> {formatScheduledTime(rowData.schd_time)}</li>
          <li><strong>Adjusted:</strong> {rowData.adjusted ? "Yes":"No"}</li>
          <li><strong>Comments:</strong> {rowData.comments}</li>
          <li><strong>Driver ID:</strong> {rowData.driver_id}</li>
          <li><strong>Vehicle ID:</strong> {rowData.vehicle_id}</li>
          <li><strong>Prediction Generated:</strong> {formatTime(rowData.prdt)}</li>
          <li><strong>Is Approaching:</strong> {rowData.isApp === "1" ? "Yes" : "No"}</li>
          <li><strong>Is Delayed:</strong> {rowData.isDly === "1" ? "Yes" : "No"}</li>
          <li><strong>Is Fault:</strong> {rowData.isFlt === "1" ? "Yes" : "No"}</li>
          <li><strong>Scheduled Interval:</strong> {rowData.schInt} minutes</li>
          <li><strong>Scheduled Headway:</strong> {scheduledHeadwayMinutes} minutes</li>
          <li><strong>Trip Number:</strong> {rowData.tripno}</li>
        </ul>
      </div>
    </Modal>
  );
};

export default ModalRail;

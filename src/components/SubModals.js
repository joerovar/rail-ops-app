import React from 'react';
import { calculateTimeUntilArrival, formatTime, formatScheduledTime, calculateDeviation } from './utils';
import Modal from './Modal';
import API_URLS from '../config';

export const ModalRail = (props) => {
  const { rowData, stationName } = props;
  const pushUrl = `${API_URLS.PUSH_RAIL}`;

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
        <table className="modalTable">
          <tbody>
            <tr>
              <td><strong>Prd. Time</strong></td>
              <td>{formatTime(rowData.arrT)}</td>
            </tr>
            <tr>
              <td><strong>Time Until</strong></td>
              <td>{timeUntilArrival} min</td>
            </tr>
            <tr>
              <td><strong>Schd. Time</strong></td>
              <td>{formatScheduledTime(rowData.schd_time)}</td>
            </tr>
            <tr>
              <td><strong>Adjusted</strong></td>
              <td>{rowData.adjusted ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Comments</strong></td>
              <td>{rowData.comments}</td>
            </tr>
            <tr>
              <td><strong>Driver ID</strong></td>
              <td>{rowData.driver_id}</td>
            </tr>
            <tr>
              <td><strong>Vehicle ID</strong></td>
              <td>{rowData.vehicle_id}</td>
            </tr>
            <tr>
              <td><strong>Approaching</strong></td>
              <td>{rowData.isApp === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Delayed</strong></td>
              <td>{rowData.isDly === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Faulty</strong></td>
              <td>{rowData.isFlt === "1" ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><strong>Schd. Interval</strong></td>
              <td>{rowData.schInt} min</td>
            </tr>
            <tr>
              <td><strong>Schd. Headway</strong></td>
              <td>{scheduledHeadwayMinutes} min</td>
            </tr>
            <tr>
              <td><strong>Trip Number</strong></td>
              <td>{rowData.tripno}</td>
            </tr>
            <tr>
              <td><strong>Predicted at</strong></td>
              <td>{formatTime(rowData.prdt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

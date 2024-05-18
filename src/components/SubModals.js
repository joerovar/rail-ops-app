import React from 'react';
import moment from 'moment-timezone'; // Import moment-timezone
import Modal from './Modal';

export const ModalRail = (props) => {
  const { rowData } = props;
  const toggleConfUrl = `blabla`;

  const formatTime = (datetime) => {
    return moment(datetime).format('HH:mm');
  };

  const calculateTimeUntilArrival = (arrT) => {
    const arrivalTime = moment(arrT);
    const centralTime = moment().tz("America/Chicago"); // US Central Time
    const diffMins = Math.ceil(arrivalTime.diff(centralTime, 'minutes'));
    return diffMins;
  };

  const timeUntilArrival = calculateTimeUntilArrival(rowData.arrT);

  return (
    <Modal
      closeModal={props.closeModal}
      rowData={rowData}
      toggleConfUrl={toggleConfUrl}
      title={`Run ${rowData.runid}`}
    >
      <div className="bodySection">
        <ul>
          <li><strong>Arrival Time:</strong> {formatTime(rowData.arrT)}</li>
          <li><strong>Time Until Arrival:</strong> {timeUntilArrival} minutes</li>
          <li><strong>Destination Name:</strong> {rowData.destNm}</li>
          <li><strong>Is Approaching:</strong> {rowData.isApp === "1" ? "Yes" : "No"}</li>
          <li><strong>Is Delayed:</strong> {rowData.isDly === "1" ? "Yes" : "No"}</li>
          <li><strong>Is Fault:</strong> {rowData.isFlt === "1" ? "Yes" : "No"}</li>
          <li><strong>Prediction Time:</strong> {formatTime(rowData.prdt)}</li>
          <li><strong>Scheduled Interval:</strong> {rowData.schInt} minutes</li>
          <li><strong>Scheduled Headway:</strong> {rowData.schd_headway} seconds</li>
          <li><strong>Timepoint Time:</strong> {rowData.timepoint_time} seconds</li>
          <li><strong>Trip Number:</strong> {rowData.tripno}</li>
        </ul>
      </div>
    </Modal>
  );
};

export default ModalRail;


export const ModalNavyPier = (props) => {
  const { rowData } = props;
  const trip_id = rowData["trip_id"];
  const toggleConfUrl = `https://bus-control-web-demo.ue.r.appspot.com/bus/toggle?trip_id=${trip_id}&field=conf_np`;

  const formatPrdatmNp = (prdatmNp) => {
    if (prdatmNp && prdatmNp.length >= 8) {
      return prdatmNp.slice(-8, -3);
    }
    return prdatmNp;
  };

  const formatMoveTrip = (recNp) => {
    if (recNp > 0) {
      return { text: `${recNp} back`, color: 'red' };
    } else if (recNp < 0) {
      return { text: `${Math.abs(recNp)} up`, color: 'red' };
    } else {
      return { text: '', color: 'inherit' };
    }
  };

  return (
    <Modal
      closeModal={props.closeModal}
      rowData={rowData}
      trip_id={trip_id}
      toggleConfUrl={toggleConfUrl}
      title={`Run ${rowData.rid} Bus ${rowData.vid} Badge ${rowData.oid}`}
    >
      <div className="bodySection">
        <li>
          <strong>Move trip by:</strong>
          <span style={{ color: formatMoveTrip(rowData.rec_np).color }}>
            {formatMoveTrip(rowData.rec_np).text}
          </span>
        </li>
        <li><strong>arrival:</strong> {formatPrdatmNp(rowData.prdatm_np)}</li>
        <li><strong>instructed:</strong> {rowData.conf_np}</li>
        <li><strong>normal headway:</strong> {rowData.sh_np}</li>
        <li><strong>headway:</strong> {rowData.h_np}</li>
        <li><strong>next headway:</strong> {rowData.fh_np}</li>
        <li><strong>in relief:</strong> {rowData.relieved}</li>
        <li><strong>ebus?:</strong> {rowData.ebus}</li>
        <li><strong>next recovery:</strong> {rowData.recovery}</li>
        <li><strong>trip ID:</strong> {rowData.trip_id}</li>
      </div>
    </Modal>
  );
};

export const ModalRed = (props) => {
  const { rowData } = props;
  const trip_id = rowData["trip_id"];
  const toggleConfUrl = `https://bus-control-web-demo.ue.r.appspot.com/bus/toggle?trip_id=${trip_id}&field=conf_red`;

  return (
    <Modal
      closeModal={props.closeModal}
      rowData={rowData}
      trip_id={trip_id}
      toggleConfUrl={toggleConfUrl}
      title={`Run ${rowData.rid} Bus ${rowData.vid} Badge ${rowData.oid}`}
    >
      <div className="bodySection">
        <ul>
          <li><strong>hold back:</strong> {rowData.rec_red}</li>
          <li><strong>instructed:</strong> {rowData.conf_red}</li>
          <li><strong>in relief:</strong> {rowData.relieved}</li>
          <li><strong>normal headway:</strong> {rowData.sh_np}</li>
          <li><strong>next recovery:</strong> {rowData.recovery}</li>
          <li><strong>trip ID:</strong> {rowData.trip_id}</li>
        </ul>
      </div>
    </Modal>
  );
};

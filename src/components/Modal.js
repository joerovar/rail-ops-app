import React, { useState, useEffect } from "react";
import "./modal.css";
import { pushAdjust } from './utils'; // Import the pushAdjust function

const Modal = ({ closeModal, rowData, pushUrl, title, stationName, children }) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [isAdjusting, setIsAdjusting] = useState(false);

  useEffect(() => {
    // Set the local state with the prop data only if it is not null or undefined
    if (rowData) {
      setData(rowData);
    }
  }, [rowData]);

  const handleAdjust = async () => {
    setIsAdjusting(true);
    setMessage('Processing...');
    try {
      await pushAdjust(pushUrl, rowData, stationName); // Call the pushAdjust function with the necessary parameters
      setMessage('Adjustment pushed successfully.');
    } catch (error) {
      setMessage('Failed to push adjustment.');
    } finally {
      setIsAdjusting(false);
    }
  };

  const buttonLabel = rowData.adjusted ? 'Cancel' : 'Adjust';

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> x </button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="manualInputs">
          <button onClick={handleAdjust} className="adjustButton" disabled={isAdjusting}>
            {buttonLabel}
          </button>
        </div>
        {message && <div className="message">{message}</div>}
        <div className="body">
          {children}
          <div className="bodySection">
            {/* Additional information */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

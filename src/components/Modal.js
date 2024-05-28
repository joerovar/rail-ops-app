import React, { useState, useEffect } from "react";
import "./modal.css";
import { pushAdjust } from './utils'; // Import the pushAdjust function

const Modal = ({ closeModal, rowData, pushUrl, title, stationName, children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Set the local state with the prop data only if it is not null or undefined
    if (rowData) {
      setData(rowData);
    }
  }, [rowData]);

  const handleAdjust = () => {
    pushAdjust(pushUrl, rowData, stationName); // Call the pushAdjust function with the necessary parameters
  };

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
          <button onClick={handleAdjust} className="adjustButton">Adjust</button>
        </div>
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

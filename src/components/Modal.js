import React, { useState, useEffect } from "react";
import "./modal.css";
import { pushAdjust } from './utils'; // Import the pushAdjust function

const Modal = ({ closeModal, rowData, pushUrl, title, stationName, children }) => {
  const [data, setData] = useState([]);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const [adjustMessage, setAdjustMessage] = useState("");

  useEffect(() => {
    if (rowData) {
      setData(rowData);
    }
  }, [rowData]);

  const handleAdjust = async () => {
    setIsAdjusting(true);
    setAdjustMessage("Adjusting...");
    await pushAdjust(pushUrl, rowData, stationName);
    setAdjustMessage("Adjustment pushed successfully.");
    setIsAdjusting(false);
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
          <button onClick={handleAdjust} className="adjustButton" disabled={isAdjusting}>
            {rowData.adjusted ? "Cancel" : "Adjust"}
          </button>
          <p className="adjustmentMessage">{adjustMessage}</p>
        </div>
        <div className="body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

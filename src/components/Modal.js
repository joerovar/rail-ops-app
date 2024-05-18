import React, { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({ closeModal, rowData, toggleConfUrl, title, children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Set the local state with the prop data only if it is not null or undefined
    if (rowData) {
      setData(rowData);
    }
  }, [rowData]);

  /*
  // Function to toggle confirmation
  const toggleConfirmation = async () => {
    try {
      const response = await fetch(toggleConfUrl); // GET is the default method
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Assuming the API response includes the new state, you'd update some state here
    } catch (error) {
      console.error("Error toggling confirmation:", error);
    }
  };
  */

  // Temporary placeholder function
  const toggleConfirmation = () => {
    console.log("Toggle confirmation function is currently disabled.");
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
        <div className="body">
          {children}
          <div className="bodySection">
            <button onClick={toggleConfirmation}>Toggle Confirmation</button>
          </div>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

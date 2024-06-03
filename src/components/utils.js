import moment from 'moment-timezone'; // Import moment-timezone
import axios from 'axios';
import { useEffect, useState } from 'react';

// Define the FormatDev function
export const FormatDev = (value) => {
  if (value === null || value === undefined) {
    return '';
  } else if (value >= -1 && value <= 5) {
    return `${value} on-time`;
  } else if (value < -1) {
    return `${value} early`;
  } else {
    return `${value} late`;
  }
};

// Define the HwDev function
export const HwDev = (value) => {
  if (value === null || value === undefined) {
    return '';
  } else if (value > 5) {
    return `${value} gapped`;
  } else if (value < -5) {
    return `${value} bunched`;
  } else {
    return `${value} ok`;
  }
};

// Helper function to calculate deviation
export const calculateDeviation = (arrT, schd_time) => {
  const arrivalTime = moment.tz(arrT, "America/Chicago");
  const midnightChicago = moment().tz("America/Chicago").startOf('day'); // Midnight in Chicago time
  const scheduledTime = midnightChicago.add(schd_time, 'seconds');
  const deviation = Math.ceil(arrivalTime.diff(scheduledTime, 'minutes'));
  return deviation;
};

// Function to calculate Time Until Arrival
export const calculateTimeUntilArrival = (arrT) => {
  const arrivalTimeChicago = moment.tz(arrT, "America/Chicago");
  const arrivalTimeLocal = arrivalTimeChicago.clone().local(); // Convert to local time
  const currentTime = moment(); // Current local time
  const diffMins = Math.ceil(arrivalTimeLocal.diff(currentTime, 'minutes'));
  return diffMins;
};

// Function to format Time
export const formatTime = (datetime) => {
  return moment(datetime).format('HH:mm');
};

// Function to convert schd_time (seconds since midnight) to HH:mm
export const formatScheduledTime = (schd_time) => {
  const midnightChicago = moment().tz("America/Chicago").startOf('day'); // Midnight in Chicago time
  const scheduledTime = midnightChicago.add(schd_time, 'seconds');
  return scheduledTime.format('HH:mm');
};

// Function to handle the API call for adjusting
export const pushAdjust = async (baseUrl, rowData, stationName) => {
  const adjusted = !rowData.adjusted; // Toggle the adjusted value
  const runId = rowData.runid.slice(-3); // Slice the last three characters of runid

  console.log('Constructed URL:', baseUrl); // Log the base URL

  try {
    const response = await axios.post(baseUrl, {
      runid: runId,
      station: stationName,
      adjusted: adjusted
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Adjustment pushed successfully:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
};

// Function to fetch data from the API
export const fetchData = async (url, station = "OHareS", phorizon = 5, fhorizon = 20) => {
  try {
    const fullUrl = `${url}?phorizon=${phorizon}&fhorizon=${fhorizon}&station=${station}`;
    console.log('Fetching data from URL:', fullUrl);
    
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Hook for fetching table data
const useTableData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useTableData;

import moment from 'moment-timezone'; // Import moment-timezone
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
export const pushAdjust = async (baseUrl, rowData) => {
  const adjusted = !rowData.adjusted; // Toggle the adjusted value
  const runId = rowData.rn; // Use the pre-sliced value directly
  const url = `${baseUrl}?runid=${runId}&adjusted=${adjusted}`;

  try {
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log('Adjustment pushed successfully:', result);
  } catch (error) {
    console.error('Error pushing adjustment:', error);
  }
};


const useTableData = (url, num = 3, station = "OHareS") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}?num=${num}&station=${station}`);
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
  }, [url, num, station]);

  return { data, loading, error };
};

export default useTableData;



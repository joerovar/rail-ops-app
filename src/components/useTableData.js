import { useEffect, useState } from 'react';

const useTableData = (url, stationName = null) => {
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
        
        // Log the fetched result
        console.log('Fetched result:', result);

        // If a station name is provided, use it
        if (stationName && result[stationName]) {
          setData(result[stationName]);
        } else {
          // Otherwise, find the first station with trips
          const stationWithTrips = Object.keys(result).find(
            (key) => Array.isArray(result[key]) && result[key].length > 0
          );
          if (stationWithTrips) {
            setData(result[stationWithTrips]);
          }
        }

        // Log the data that will be set
        console.log('Set data:', data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, stationName]);

  return { data, loading, error };
};

export default useTableData;

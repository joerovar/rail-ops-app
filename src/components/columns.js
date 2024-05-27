import { FormatDev, HwDev, calculateDeviation, calculateTimeUntilArrival, formatScheduledTime, formatTime } from './utils';

export const COLUMNS_RAIL = [
  {
    Header: 'Destination',
    accessor: 'destNm',
  },
  {
    Header: 'Run',
    accessor: 'runid',
  },
  {
    Header: 'Time Until',
    accessor: 'arrT',
    id: 'timeUntilArrival', // Add unique ID
    Cell: ({ value }) => {
      const diffMins = calculateTimeUntilArrival(value);
      return `${diffMins} minutes`;
    },
  },
  {
    Header: 'Time',
    accessor: 'arrT',
    id: 'arrivalTime', // Add unique ID
    Cell: ({ value }) => formatTime(value),
  },
  {
    Header: 'Schd. Time',
    accessor: 'schd_time',
    id: 'schdTime',
    Cell: ({ value }) => formatScheduledTime(value),
  },
  {
    Header: 'Headway',
    accessor: 'arrT_headway',
    id: 'arrT_headway',
    Cell: ({ value }) => `${Math.ceil(value / 60)} minutes`,
  },
  {
    Header: 'Scheduled Headway',
    accessor: 'schd_headway',
    Cell: ({ value }) => `${Math.ceil(value / 60)} minutes`,
  },
  {
    Header: 'Dev.',
    accessor: 'deviation',
    Cell: ({ row }) => {
      const deviation = calculateDeviation(row.original.arrT, row.original.schd_time);
      return FormatDev(deviation);
    }
  },
  {
    Header: 'Hw. Dev.',
    accessor: 'headwayDeviation',
    Cell: ({ row }) => {
      const headwayMinutes = Math.ceil(row.original.arrT_headway / 60); // Convert headway to minutes
      const scheduledHeadwayMinutes = Math.ceil(row.original.schd_headway / 60); // Convert scheduled headway to minutes
      const headwayDeviation = headwayMinutes - scheduledHeadwayMinutes; // Calculate the deviation
      return HwDev(headwayDeviation);
    }
  },
];

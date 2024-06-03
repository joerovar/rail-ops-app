import { FormatDev, HwDev, calculateDeviation, calculateTimeUntilArrival, formatScheduledTime, formatTime } from './utils';

export const COLUMNS_RAIL = [
  {
    Header: 'Towards',
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
      return `${diffMins} min`;
    },
  },
  {
    Header: 'Prd. Time',
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
    Header: 'Schd. Dev.',
    accessor: 'deviation',
    Cell: ({ row }) => {
      const deviation = calculateDeviation(row.original.arrT, row.original.schd_time);
      return FormatDev(deviation);
    }
  },
  {
    Header: 'Headway',
    accessor: 'arrT_headway',
    id: 'arrT_headway',
    Cell: ({ value }) => `${Math.ceil(value / 60)} min`,
  },
  {
    Header: 'Schd. Headway',
    accessor: 'schd_headway',
    Cell: ({ value }) => `${Math.ceil(value / 60)} min`,
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

export const COLUMNS_GENERAL = [
  {
    Header: 'From',
    accessor: 'staNm',
  },
  {
    Header: 'To',
    accessor: 'destNm',
  },
  {
    Header: 'Prd. Time',
    accessor: 'arrT',
    id: 'arrivalTime', // Add unique ID
    Cell: ({ value }) => formatTime(value),
  },
  {
    Header: 'Adj.',
    accessor: 'holding_time',
  },
];


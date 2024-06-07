import React from 'react';
import { COLUMNS_RAIL } from './columns';
import API_URLS from '../config';
import { ModalRail } from './ModalRail';
import Table from './Table';

export const TableRail = ({ stationName = "OHareS", phorizon = 5, fhorizon = 20 }) => {
  const dataUrl = `${API_URLS.ALL_RAIL}?station=${stationName}&phorizon=${phorizon}&fhorizon=${fhorizon}`;
  
  return (
    <Table
      columns={COLUMNS_RAIL}
      dataUrl={dataUrl}
      ModalComponent={ModalRail}
      stationName={stationName}
    />
  );
};

import React from 'react';
import { COLUMNS_RAIL } from './columns';
import API_URLS from '../config';
import ModalRail from './SubModals';
import Table from './Table';

export const TableRail = ({ stationName = "OHareS" }) => (
  <Table
    columns={COLUMNS_RAIL}
    dataUrl={API_URLS.ALL_RAIL}
    ModalComponent={ModalRail}
    stationName={stationName}
  />
);

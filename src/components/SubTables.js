import React from 'react';
import { COLUMNS_NAVY_PIER, COLUMNS_RAIL, COLUMNS_RED } from './columns';
import API_URLS from '../config';
import ModalRail, {ModalNavyPier, ModalRed} from './SubModals';
import Table from './Table';

export const TableRail = () => (
    <Table
      columns={COLUMNS_RAIL}
      dataUrl={API_URLS.ALL_RAIL}
      ModalComponent={ModalRail}
      stationName="OHareN" // Optional, can be omitted
    />
  );

export const TableNavyPier = () => (
  <Table columns={COLUMNS_NAVY_PIER} dataUrl={API_URLS.NAVY_PIER} ModalComponent={ModalNavyPier} />
);

export const TableRed = () => (
  <Table columns={COLUMNS_RED} dataUrl={API_URLS.RED} ModalComponent={ModalRed} />
);

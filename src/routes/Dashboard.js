import React from 'react';
import { TableRail } from "../components/SubTables";
import TableGeneral from '../components/TableGeneral';
import { downloadLog } from '../components/utils';

export const DashboardOHare = () => {
    return (
        <div>
            <h2>O'Hare Arrivals</h2>
            <TableRail stationName='OHareN'/>
            <h2>O'Hare Departures</h2>
            <TableRail stationName='OHareS'/>
        </div>
    )
}

export const DashboardFPark = () => {
    return (
        <div>
            <h2>Forest Park Arrivals</h2>
            <TableRail stationName='FstPkS'/>
            <h2>Forest Park Departures</h2>
            <TableRail stationName='FstPkN'/>
        </div>
    )
}

export const DashboardUIC = () => {
    return (
        <div>
            <h2>UIC Arrivals</h2>
            <TableRail stationName='UICHdS'/>
            <h2>UIC Departures</h2>
            <TableRail stationName='UICHdN'/>
        </div>
    )
}

export const DashboardGeneral = () => {
    const phorizon = 40;
    const fhorizon = 10;

    const handleDownloadLog = () => {
        const today = new Date().toISOString().split('T')[0]; // Format today's date as yyyy-mm-dd
        downloadLog(today);
    };

    return (
        <div>
            <h2>Adjusted Trips</h2>
            <h4>*Trips between the last {phorizon} minutes and the next {fhorizon} minutes</h4>
            <button onClick={handleDownloadLog} className="downloadButton">Download Log</button>
            <TableGeneral stations={['OHareS', 'UICHdN', 'FParkN']} phorizon={phorizon} fhorizon={fhorizon} />
        </div>
    );
};
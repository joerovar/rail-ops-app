import React from 'react';
import { TableRail } from "../components/TableRail";
import TableGeneral from '../components/TableGeneral';
import { downloadLog } from '../components/utils';

export const DashboardOHare = () => {
    return (
        <div>
            <p>*Click over a row to see more details</p>
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
            <p>*Click over a row to see more details</p>
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
            <p>*Click over a row to see more details</p>
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
        const today = new Date();
        const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0]; // Format today's date as yyyy-mm-dd in local time
        
        console.log('Local Date:', localDate); // Log the local date being used
        downloadLog(localDate);
    };

    return (
        <div>
            <button onClick={handleDownloadLog} className="downloadButton">Download Daily Log</button>
            <h2>Adjusted Trips</h2>
            <p>*between the last {phorizon} minutes and the next {fhorizon} minutes</p>
            <TableGeneral stations={['OHareS', 'UICHdN', 'FParkN']} phorizon={phorizon} fhorizon={fhorizon} />
        </div>
    );
};
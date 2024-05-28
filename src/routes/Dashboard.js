import React from 'react';
import { TableRail } from "../components/SubTables";

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

import React from 'react';
import { TableRail } from "../components/SubTables";

export const DashboardOHare = () => {
    return (
        <div>
            <h2>O'Hare Runs</h2>
            <TableRail/>
        </div>
    )
}

export const DashboardFPark = () => {
    return (
        <div>
            <h2>Forest Park Runs</h2>
            <TableRail/>
        </div>
    )
}

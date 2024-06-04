import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './table.css';
import axios from 'axios';
import { COLUMNS_GENERAL } from './columns';
import API_URLS from '../config';
import ModalGeneral from './ModalGeneral';

const TableGeneral = ({ stations = ["OHareS", "UICHdN", "FParkN"], phorizon = 40, fhorizon = 5 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(stations.map(station => 
        axios.get(`${API_URLS.ALL_RAIL}?phorizon=${phorizon}&fhorizon=${fhorizon}&station=${station}`)
      ));
      const filteredData = results.flatMap(response => 
        response.data.filter(trip => trip.adjusted === true)
      );
      setData(filteredData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [stations, phorizon, fhorizon]);

  const memoizedColumns = useMemo(() => COLUMNS_GENERAL, []);

  const table = useTable({ columns: memoizedColumns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  const getSelectedRowValues = selectedRow => {
    setSelectedRowData(selectedRow.original);
    setOpenModal(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="table">
      <div className="tableHeader">
        <button onClick={fetchData} className="refreshButton" title="Refresh">
          &#x21bb; {/* Unicode for refresh icon */}
        </button>
      </div>
      {openModal && (
        <ModalGeneral
          closeModal={() => setOpenModal(false)}
          rowData={selectedRowData}
        />
      )}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => { getSelectedRowValues(row); }}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableGeneral;

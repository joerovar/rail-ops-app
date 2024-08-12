import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './table.css';
import useTableData from './utils';

const Table = ({ columns, dataUrl, ModalComponent, stationName = "OHareS" }) => {
  const { data, loading, error, refreshData } = useTableData(dataUrl, stationName);
  const memoizedColumns = useMemo(() => columns, []);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const table = useTable({ columns: memoizedColumns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;

  const getSelectedRowValues = selectedRow => {
    setSelectedRowData(selectedRow.original);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="table">
      <div className="tableHeader">
        <button onClick={refreshData} className="refreshButton" title="Refresh">
          &#x21bb; {/* Unicode for refresh icon */}
        </button>
      </div>
      {openModal && ( 
      <ModalComponent 
      closeModal={setOpenModal} 
      rowData={selectedRowData}
      stationName={stationName} /> 
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
              <tr {...row.getRowProps()} onClick={() => { getSelectedRowValues(row); setOpenModal(true); }}>
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

export default Table;

import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './table.css';
import useTableData from './useTableData';

const Table = ({ columns, dataUrl, ModalComponent }) => {
  const { data, loading, error } = useTableData(dataUrl);
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
      {openModal && <ModalComponent closeModal={setOpenModal} rowData={selectedRowData} />}
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


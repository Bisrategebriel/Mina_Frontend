import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';

function Table({ columns, data, tableData, setTableData, tableRefreshed, setTableRefreshed, setSortBy, asc, setAsc }) {

    const [canPreviousPage, setCanPreviousPage] = useState(false)
    const [canNextPage, setCanNextPage] = useState(true)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: tableData.pageCount,
            pageSize: tableData.pageSize,
            currentPage: tableData.currentPage
        },
        usePagination
    );

    useEffect(()=>{
        tableData.currentPage >= 2 ? setCanPreviousPage(true) : setCanPreviousPage(false)
        tableData.currentPage < tableData.pageCount ? setCanNextPage(true) : setCanNextPage(false)
    },[])

    useEffect(()=>{
        // Set disabled status of next and back buttons
        tableData.currentPage >= 2 ? setCanPreviousPage(true) : setCanPreviousPage(false)
        tableData.currentPage < tableData.pageCount ? setCanNextPage(true) : setCanNextPage(false)
        
        // Reset the current page when changing the size of rows per page
        tableData.currentPage > tableData.pageCount && setTableRefreshed(1)
    },[tableData.currentPage, tableData.pageSize, tableData.pageCount])

    // Render the UI for your table
    return (    
        <div className='max-w-screen overflow-x-auto'>
            <table {...getTableProps()} className="w-full ">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}
                            className='bg-mina-blue-light text-white'
                        >
                            {headerGroup.headers.map(column => (
                                <th 
                                className=' p-2 hover:cursor-pointer text-start'
                                {...column.getHeaderProps()}
                                    onClick={()=>{setSortBy(column.id); setAsc(!asc)}}
                                >{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="">
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className='hover:bg-slate-50 odd:bg-slate-100' {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td className='p-2 text-start' {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* 
                Pagination 
            */}
            <div className="w-full flex flex-wrap space-x-3 justify-end p-3 mt-4 space-y-2 items-center">
                <button onClick={() => setTableRefreshed(1)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => {
                    setTableRefreshed(tableData.currentPage-1)
                }} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}

                <span>
                    Page{' '}
                    <strong>
                        {/* {pageIndex + 1} of {pageOptions.length} */}
                        {tableData.currentPage} of {tableData.pageCount}
                    </strong>{' '}
                </span>
                
                <button onClick={() => {
                    setTableRefreshed(tableData.currentPage+1)
                }} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}

                <button onClick={() => {setTableRefreshed(tableData.pageCount)}} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={tableData.currentPage}
                        min={1}
                        max={tableData.pageCount}
                        onChange={e => {
                            const page = e.target.value ? (((Number(e.target.value)>tableData.pageCount)||(Number(e.target.value)<1)) ? 1 : Number(e.target.value)) : tableData.currentPage;
                            setTableRefreshed(page)
                        }}
                        className="p-2 w-24"
                    />
                </span>{' '}
                <select
                    value={tableData.pageSize}
                    onChange={e => {
                        // setPageSize(Number(e.target.value));
                        setTableData({
                            ...tableData,
                            pageSize: e.target.value
                        })
                    }}
                >
                    {[2, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
export default Table;
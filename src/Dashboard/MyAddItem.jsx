import React, { useState } from 'react';
import useMyItemPagintion from '../Hooks/useMyItemPagintion';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { MdDeleteForever } from 'react-icons/md';

const MyAddItem = () => {
    const [item, setItem] =useState();
   const  {currentProducts,isLoading,page,setPage, totalProducts,itemsPerPage} = useMyItemPagintion()
    console.log(currentProducts);

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("product_name", {
            cell: (info) => <span>${info.getValue()}</span>,
            header: "product_Name",
        }),
        columnHelper.accessor("price", {
            cell: (info) => <span>${info.getValue()}</span>,
            header: "Price",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => <button onClick={() => handleDelete(info.getValue())}><MdDeleteForever className='text-red-600 text-3xl' /></button>,
            header: "Delete",
        }),
        columnHelper.accessor("panding", {
            cell: (info) =>info.getValue() ?  <button>panding</button>:<button>Added</button>,
            header: "Status",
        }),
    ]

    const table = useReactTable({
        data: currentProducts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: 0, // Start on the first page
                pageSize: 10,  // Set the page size to 5
            },
        },
    });
    
    return (
        <div className='mx-10'>
             <div className='my-14'>
            <table className="min-w-full  text-left">
                <thead className="bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-3.5 py-2 text-white capitalize">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={`text-white ${index % 2 === 0 ? 'bg-sky-600' : 'bg-sky-500'}`}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-3.5 py-2">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className='pr-20'>
                {
                    table.getPageCount() > 1 &&
                    <div className="flex flex-col md:flex-row items-center justify-end mt-2 gap-2">
                        <div className="flex items-center gap-1">
                            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-1 border border-gray-300 px-2 disabled:opacity-30">{'<'}</button>
                            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-1 border border-gray-300 px-2 disabled:opacity-30">{'>'}</button>
                            <span>
                                Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount().toLocaleString()}
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
        </div>
    );
};

export default MyAddItem;
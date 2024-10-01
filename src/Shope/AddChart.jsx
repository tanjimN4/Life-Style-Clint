import React, { useContext, useEffect, useMemo, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import Proceed from './Proceed';
import imageNoData from '../assets/image/Group.png';
import { Link } from 'react-router-dom';


const AddChart = () => {
    const axiospublic = useAxiosPublic()
    const { user } = useContext(AuthContext)
    const [filter, setFilter] = useState([])
    const queryClient = useQueryClient()

    const { data: addchart = [], isLoading } = useQuery({
        queryKey: ['addchart'],
        queryFn: async () => {
            const response = await axiospublic.get('/add/chart')
            return response.data
        },
    })

    const filteredData = useMemo(() => {
        return addchart.filter(item => item.user_email === user.email);
    }, [addchart, user]);

    useEffect(() => {
        setFilter(filteredData);
    }, [filteredData]);

    const totalPrice = filter.reduce((total, fill) => total + fill.price, 0)

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.display({
            id: "product_details",
            header: "Product Details",
            cell: (info) => {
                const { product_image, product_name, product_description } = info.row.original;
                const { Fit, Pattern } = product_description;
                return (
                    <div className="flex items-center">
                        <img
                            src={product_image}
                            className="w-24 h-24 object-cover object-top rounded-lg"
                            alt={product_name}
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">{product_name}</h2>
                            <p>Fit : {Fit}</p>
                            <p>Pattern : {Pattern}</p>
                        </div>
                    </div>
                );
            },

        }),
        columnHelper.accessor("price", {
            cell: (info) => <span>${info.getValue()}</span>,
            header: "Price",
        }),
        columnHelper.accessor("shipping", {
            cell: (info) => <span>Free</span>,
            header: "Shipping",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => <button onClick={() => handleDelete(info.getValue())}><MdDeleteForever className='text-red-600 text-3xl' /></button>,
            header: "Delete",
        }),
        columnHelper.accessor("_id", {
            cell: (info) => <button onClick={() => handleDelete(info.getValue())}><MdDeleteForever className='text-red-600 text-3xl' /></button>,
            header: "Delete",
        }),
        
    ]
    const table = useReactTable({
        data: filter,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: 0, // Start on the first page
                pageSize: 5,  // Set the page size to 5
            },
        },
    });

    const handleDelete = (id) => {
        axiospublic.delete(`/add/chart/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Deleted',
                        text: 'Product deleted successfully',
                        icon: 'success',
                    })
                    const updatedFilter = filter.filter(item => item._id !== id);
                    setFilter(updatedFilter)
                    queryClient.invalidateQueries('addchart')
                }

            })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (filter.length === 0) {
        return <div className=' my-10 bg-slate-300 rounded-xl text-center'>
            <div className='text-center items-center flex justify-center py-10'>
                <img src={imageNoData} alt="" />
            </div>
            <Link className='btn border-none text-center mb-5 hover:bg-cyan-200 bg-[#8A33FD]' to='/shop'>Continue Shopping</Link>
        </div>
    }

    return (
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
                        <tr key={row.id}>
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
            <Proceed totalPrice={totalPrice} filter={filter}></Proceed>
        </div>
    );
};

export default AddChart;
import React, { useContext, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Orders = () => {

    const axiospublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)
    const { user } = useContext(AuthContext)
    const itemsPerPage = 9

    const { data: successProduct = [], isLoading, refetch } = useQuery({
        queryKey: ['successProduct'],
        queryFn: async () => {
            const response = await axiospublic.get(`/paymentSuccess`)
            return response.data
        }
    })
    const currentProducts = Array.isArray(successProduct) ?
        successProduct.slice((page - 1) * itemsPerPage, page * itemsPerPage) : []

    // console.log(currentProducts);

    const totalPages = Math.ceil(successProduct.length / itemsPerPage)
    // console.log(totalPages);


    //update status
    const handleUpdate = async (id) => {

        const newStatus = { order_status: 'inprocess' }
        await axiosSecure.put(`/orders/${id}`, newStatus)
        refetch()
    };
    return (
        <div>
            <div className='m-10'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-black text-white'>
                            <tr>
                                <th>SN</th>
                                <th>Product_Name</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                currentProducts.map((product, index) => (
                                    <tr key={product._id} className={`${index % 2 === 0 ? 'bg-slate-400' : 'bg-slate-500'} text-white`}>
                                        <th>{index + 1}</th>
                                        <td>{product.product_name}</td>
                                        <td>{product.order_status}</td>
                                        <td><button disabled={product.order_status==='inprocess'} onClick={() => handleUpdate(product._id)} className='btn button'>Update</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='my-10'>
                <div className="flex justify-center mt-4 items-center text-center">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="mr-2 btn"
                    >
                        Previous
                    </button>
                    <span>{`Page ${page} of ${totalPages}`}</span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="ml-2 btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
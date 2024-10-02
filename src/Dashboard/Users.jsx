
import React, { useContext, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Users = () => {
    const axiospublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1)
    const { user } = useContext(AuthContext)
    const itemsPerPage = 9

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiospublic.get(`/users`)
            return response.data
        }
    })
    const currentUsers = Array.isArray(users) ?
        users.slice((page - 1) * itemsPerPage, page * itemsPerPage) : []

    // console.log(currentUsers);

    const totalPages = Math.ceil(users.length / itemsPerPage)
    // console.log(totalPages);

    //delete a user
    const handleDelete = async (id) => {
        try {
            const response = await axiosSecure.delete(`/users/${id}`)
            console.log(response.data);
            //update the users list after deletion
            const users = await axiospublic.get(`/users`)
            console.log(users.data);
            //update the users list in the component
            refetch()
        } catch (error) {
            console.error(error);
        }
    }
    //make admin
    const handleMakeAdmin = async (id) => {
        try {
            const response = await axiosSecure.put(`/users/${id}`)
            console.log(response.data);
            //update the users list after making admin
            const users = await axiospublic.get(`/users`)
            console.log(users.data);
            //use refetch
            refetch()
        } catch (error) {
            console.error(error);
        }
    }




    if (isLoading) return <>Loding...</>

    return (
        <div>
            <h1 className='text-4xl text-center font-bold my-10'>Users</h1>
            <div className='mx-10'>
                <div className='grid grid-cols-1'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-black text-white'>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Delete</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentUsers.map((user, index) => (
                                        <tr className={`${index % 2 === 0 ? 'bg-slate-400' : 'bg-slate-500'} text-white`}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role === 'admin' ? 'admin' : 'user'}</td>
                                            <td><button onClick={()=>handleDelete(user._id)} className='btn button'>Delete</button></td>
                                            <td><button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className={`btn button ${user.role === 'admin' ? 'btn-disabled' : ''}`}
                                                disabled={user.role === 'admin'}
                                            >
                                                Make Admin
                                            </button></td>


                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
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

export default Users;
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Share/button.css'
import { AuthContext } from '../provider/AuthProvider';
import { MdDashboard, MdShoppingCart } from 'react-icons/md';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    // console.log(user);
    const axiospublic=useAxiosPublic()
    
    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => console.error(error)
            )
    }

    const { data: addchart = []} = useQuery({
        queryKey: ['addchart'],
        queryFn: async () => {
            const response = await axiospublic.get('/add/chart');
            return response.data;
        },
    });
    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
        {
            user ? <li><Link to='/addchart'><span className='bg-slate-500 px-1 flex items-center text-center rounded-lg'><MdShoppingCart className='text-red-700'/><p className='text-white ml-1 font-semibold'> {addchart.length}</p></span>Chart</Link></li> : <p></p>
        }
       {
        user ?  <li><Link to='/dashboard'><MdDashboard className='text-orange-500 text-xl' />DashBord</Link></li> : <li></li>
       }
    </>

    return (
        <div className='bg-slate-100 rounded-xl mb-2'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <div className="btn btn-ghost text-xl"><div className='flex font-extrabold text-opacity-30 text-3xl'><h1 className='text-green-500'>Life</h1><h1 className='text-red-400'>Style</h1></div></div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className='flex items-center text-center gap-5'><div className="avatar">
                                <div className="ring-primary items-center ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                                    <img className='object-cover object-top' src={user?.photoURL} />
                                </div>
                            </div><button onClick={handleLogOut} className='btn button'>LogOut</button></div>
                            :
                            <Link to='/login' className="btn button">Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
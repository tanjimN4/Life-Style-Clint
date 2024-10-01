import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

    const navLinks = (
        <>
            <li><NavLink to='/' className='btn button mb-2 w-1/2'>Home</NavLink></li>
            <li><NavLink to='/dashboard/additem' className='btn button mb-2 w-1/2'>Add Item</NavLink></li>
            <li><NavLink to='/dashboard/myadditem' className='btn button mb-2 w-1/2'>MY Add Item</NavLink></li>
            <li><NavLink to='/dashboard/myorder' className='btn button mb-2 w-1/2'>MY Order</NavLink></li>

        </>
    )
    return (
        <div className='flex'>
            <div className='w-1/4 h-screen pt-20 bg-slate-200'>
                <ul className='ml-10'>
                    {navLinks}
                </ul>
            </div>
            <div className='w-3/4'>
                <Outlet></Outlet>
            </div>
        </div>
    )

};

export default Dashboard;
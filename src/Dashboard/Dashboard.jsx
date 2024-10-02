import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin ] = useAdmin()
    console.log(isAdmin);
    
    const navLinks = (
        <>
            <li><NavLink to='/' className='btn button mb-2 w-1/2'>Home</NavLink></li>
            <li><NavLink to='/dashboard/additem' className='btn button mb-2 w-1/2'>Add Item</NavLink></li>
            <li><NavLink to='/dashboard/myadditem' className='btn button mb-2 w-1/2'>MY Add Item</NavLink></li>
            <li><NavLink to='/dashboard/myorder' className='btn button mb-2 w-1/2'>MY Order</NavLink></li>

            {
                isAdmin && (<>
                    <li className='text-2xl font-bold ml-10 my-10'>Admin</li>
                    <li><NavLink to='/dashboard/users' className='btn button mb-2 w-1/2'>Users</NavLink></li>
                    <li><NavLink to='/dashboard/orders' className='btn button mb-2 w-1/2'>Orders</NavLink></li>
                    <li><NavLink to='/dashboard/additems' className='btn button mb-2 w-1/2'>Add Items Request</NavLink></li>
                </>)
            }
        </>
    )
    return (
        <div className='flex'>
            <div className='w-1/4 h-screen pt-20 bg-slate-200'>
                <h1 className='text-3xl ml-10 font-bold mb-10'>My DashBoard</h1>
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
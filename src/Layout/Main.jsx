import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Share/Navbar';
import Footer from '../Share/Footer';

const Main = () => {
    return (
        <div className='mx-10'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
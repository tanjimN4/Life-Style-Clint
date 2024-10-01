import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Layout/Home/Home';
import Shope from '../Shope/Shope';
import Details from '../PrivetPage/Details';
import Login from '../Login&Register/Login';
import Register from '../Login&Register/Register';
import Private from './Private';
import AddChart from '../Shope/AddChart';
import Dashboard from '../Dashboard/Dashboard';
import User from '../Dashboard/User';
import AddItem from '../Dashboard/AddItem';
import MyAddItem from '../Dashboard/MyAddItem';
import MyOrder from '../Dashboard/MyOrder';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <Shope></Shope>
            },
            {
                path: '/details/:id',
                element: <Private><Details></Details></Private>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addchart',
                element: <Private><AddChart></AddChart></Private>
            },
        ]
    }, {
        path: '/dashboard',
        element: <Private><Dashboard></Dashboard></Private>,
        children: [
            {
                path: 'user',
                element: <User></User>
            },
            {
                path: 'additem',
                element: <AddItem></AddItem>
            },
            {
                path: 'myadditem',
                element: <MyAddItem></MyAddItem>
            },
            {
                path: 'myorder',
                element: <MyOrder></MyOrder>
            },
        ]
    }
]);



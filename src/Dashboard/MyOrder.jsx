import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';

const MyOrder = () => {
    const axiospublic = useAxiosPublic()
    const [myOrder, setMyOrder] = useState([]);
    const { user } = useContext(AuthContext)
    useEffect(() => {
        axiospublic.get('/add/chart/payment')
            .then(res => {
                const filteredOrders = res.data.filter(order => order.user_email === user?.email);
                setMyOrder(filteredOrders)
            })
    }, [])
    console.log(myOrder);
    
    return (
        <div>
            <h1 className='text-4xl font-extrabold pl-20 pt-20'>My Orders</h1>
            <div>
                {
                    myOrder.map(order => <div>
                        <div className="p-6">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">Order no:{order._id}</h2>
                                    <div className="text-sm text-gray-500">
                                        <span className="font-semibold">Order Status :</span> Inprogress
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <div>
                                        <p><span className="font-semibold">Order Date :</span> 2 June 2023 2:40 PM</p>
                                        <p><span className="font-semibold">Estimated Delivery Date :</span> 8 June 2023</p>
                                    </div>
                                    <div>
                                        <p><span className="font-semibold">Payment Method :</span> Card</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <img src={order.product_image} alt="Black Printed T-shirt" className="w-24 h-24 object-cover rounded-lg mr-4" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{order.product_name}</h3>
                                    <p className="text-sm text-gray-500">Colour : Pink</p>
                                    <p className="text-sm text-gray-500">Qty : 1</p>
                                    <p className="text-sm text-gray-500">Total : $23.00</p>
                                </div>
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">View Detail</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyOrder;
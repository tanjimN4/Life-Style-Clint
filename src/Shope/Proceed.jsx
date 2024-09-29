import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Proceed = ({ totalPrice }) => {
    const price = totalPrice


    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(totalPrice)
    const [isOn, isOf] = useState(false)

    useEffect(() => {
        setDiscount(totalPrice);
    }, [totalPrice]);

    const couponDiscount = () => {
        if (coupon === 'Admin') {
            const discount = price * 0.10
            setDiscount(price - discount)
            isOf(true)
            console.log(price);

        } else {
            setDiscount(totalPrice);
            isOf(false)
        }
    }
    // using ai
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between p-4 lg:p-8">
                {/* Discount Code Section */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Discount Codes</h2>
                        <div className="flex items-center space-x-4">
                            <input
                                onChange={(e) => setCoupon(e.target.value)}
                                type="text"
                                placeholder="Enter your coupon code"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <button disabled={isOn} onClick={couponDiscount} className="bg-purple-600 btn text-white px-4 py-2 rounded-md hover:bg-purple-700">
                                {isOn ? 'Coupon Applied' : 'Apply Coupon'}
                            </button>
                        </div>
                        <Link to='/shop'>
                            <button className="mt-4 text-gray-600 hover:text-gray-800 underline">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Price Section */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Sub Total</span>
                            <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Shipping</span>
                            <span className="text-gray-900">Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-xl">
                            <span className="text-gray-800">Grand Total</span>
                            <span className="text-gray-900">${discount.toFixed(2)}</span>
                        </div>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="w-full bg-purple-600 text-white mt-6 py-2 rounded-md hover:bg-purple-700" onClick={() => document.getElementById('my_modal_3').showModal()}>Proceed To Checkout</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click on ✕ button to close</p>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proceed;
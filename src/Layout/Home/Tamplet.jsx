import React from 'react';
import '../../Share/button.css'

const Tamplet = () => {
    return (
        <div className='my-10'>
        <div className="card lg:card-side bg-base-100 shadow-xl rounded-xl">
            {/* Left Side Background Image Section */}
            <div className="bg-[url('https://i.ibb.co/rpGm7rw/unsplash-b-Biu-Sdck8t-U.png')] bg-cover bg-center w-full lg:w-1/2 h-[500px] flex items-center justify-center">
                <div className="text-white p-10">
                   <h1 className='text-2xl font-bold pb-3'>WE MADE YOUR EVERYDAY FASHION BETTER!</h1>
                   <p className='pb-3'>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
                   <button  className="btn button">Shop Now</button>
                </div>
            </div>
            
            {/* Right Side Image Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <img src="https://i.ibb.co/Yfzt9bj/Rectangle-13.png" alt="Product" className="object-cover object-top w-full h-[500px]" />
            </div>
        </div>
    </div>
    
    );
};

export default Tamplet;
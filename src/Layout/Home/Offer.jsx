import React from 'react';
import offerimage1 from '../../assets/image/unsplash_Qyc13QBGaM4.jpeg';
import offerimage2 from '../../assets/image/unsplash_Qyc13QBGaM.jpeg';
import '../../Share/button.css'
const Offer = () => {
    return (
        <div className='m-10'>
            <div className='flex gap-10'>
                <div className='relative w-1/2'>
                    <img className='w-full h-64 object-cover' src={offerimage1} alt="Offer 1" />
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white'>
                        <p className="text-lg">Low Price</p>
                        <h1 className="text-3xl font-bold">High Coziness</h1>
                        <p className="mt-2">UPTO 50% OFF</p>
                        <button className="mt-4 btn button bg-white text-black px-4 py-2 rounded">Explore Items</button>
                    </div>
                </div>
                <div className='relative w-1/2'>
                    <img className='w-full h-64 object-cover' src={offerimage2} alt="Offer 2" />
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white'>
                        <p className="text-lg">Beyoung Presents</p>
                        <h1 className="text-3xl font-bold">Breezy Summer Style</h1>
                        <p className="mt-2">UPTO 50% OFF</p>
                        <button className="mt-4 btn button bg-white text-black px-4 py-2 rounded">Explore Items</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;

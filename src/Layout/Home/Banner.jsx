import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import image1 from '../../assets/image/pexels-jmendezrf-1536619.jpg'
import image2 from '../../assets/image/pexels-olly-845434.jpg'
import image3 from '../../assets/image/shop-hero-1-product-slide-1 .jpeg'
import '../../Share/button.css'

const Banner = () => {
    return (
        <div>
            <Swiper className="mySwiper">
                <SwiperSlide>
                   <div>
                   <img src={image3} alt="image1" className='w-full h-[500px] absolute rounded-xl' />
                    <div className='relative h-[500px] text-white'>
                        <h1 className='text-3xl font-bold pt-20 pl-12'>T-shirt / Tops</h1>
                        <h1 className='text-5xl font-black pl-12 pt-5'>Summer 
                        Value Pack</h1>
                        <h1 className='pl-12 pt-5'>cool / colorful / comfy</h1>
                        <div className='pl-12 pt-8'>
                        <button className='btn button'>Shop Now</button>
                        </div>

                    </div>
                   </div>
                </SwiperSlide>
                <SwiperSlide>
                   <div>
                   <img src={image2} alt="image2" className='w-full h-[500px] absolute rounded-xl' />
                   <div className='relative h-[500px] text-white'>
                        <h1 className='text-3xl font-bold pt-20 pl-12'>T-shirt / Tops</h1>
                        <h1 className='text-5xl font-black pl-12 pt-5'>Summer 
                        Value Pack</h1>
                        <h1 className='pl-12 pt-5'>cool / colorful / comfy</h1>
                        <div className='pl-12 pt-8'>
                        <button className='btn button'>Shop Now</button>
                        </div>

                    </div>
                   </div>

                </SwiperSlide>
                <SwiperSlide>
                <div>
                   <img src={image1} alt="image2" className='w-full h-[500px] absolute rounded-xl' />
                   <div className='relative h-[500px] text-white'>
                        <h1 className='text-3xl font-bold pt-20 pl-12'>T-shirt / Tops</h1>
                        <h1 className='text-5xl font-black pl-12 pt-5'>Summer 
                        Value Pack</h1>
                        <h1 className='pl-12 pt-5'>cool / colorful / comfy</h1>
                        <div className='pl-12 pt-8'>
                        <button className='btn button'>Shop Now</button>
                        </div>

                    </div>
                   </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
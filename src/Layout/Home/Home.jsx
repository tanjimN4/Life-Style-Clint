import React from 'react';
import Banner from './Banner';
import Offer from './Offer';
import Newarrival from './Newarrival';
import Tamplet from './Tamplet';
import CategoriesForMen from './CategoriesForMen';
import CategoriesForWomen from './CategoriesForWomen';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Offer></Offer>
            <Newarrival></Newarrival>
            <Tamplet></Tamplet>
            <CategoriesForMen></CategoriesForMen>
            <CategoriesForWomen></CategoriesForWomen>
        </div>
    );
};

export default Home;
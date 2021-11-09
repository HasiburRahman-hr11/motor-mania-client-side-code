import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import HomeBanner from '../../Components/HomeBanner/HomeBanner';
import "slick-carousel/slick/slick.css";
import HomeBikes from '../../Components/HomeBikes/HomeBikes';

const Home = () => {
    return (
        <>
            <Header />
            <HomeBanner />
            <HomeBikes/>

            <Footer/>
        </>
    );
};

export default Home;
import React from 'react';
import "slick-carousel/slick/slick.css";
import BannerSection from '../../Components/BannerSection/BannerSection';
import BikesSection from '../../Components/BikesSection/BikesSection';
import ReviewsSection from '../../Components/ReviewsSection/ReviewsSection';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NewsLetterSection from '../../Components/NewsletterSection/NewsLetterSection';


const Home = () => {
    return (
        <>
            <Header />
            <BannerSection/>
            <BikesSection/>
            <ReviewsSection/>
            <NewsLetterSection/>

            <Footer/>
        </>
    );
};

export default Home;
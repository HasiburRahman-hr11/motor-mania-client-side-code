import React, { useContext } from 'react';
import "slick-carousel/slick/slick.css";
import BannerSection from '../../Components/BannerSection/BannerSection';
import BikesSection from '../../Components/BikesSection/BikesSection';
import ReviewsSection from '../../Components/ReviewsSection/ReviewsSection';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NewsLetterSection from '../../Components/NewsletterSection/NewsLetterSection';
import { ProductContext } from '../../Context/ProductContext/ProductContext';
import Loading from '../../Components/Loading/Loading';

const Home = () => {
    const { bikes, loading } = useContext(ProductContext);

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Header />
            <BannerSection bikes={bikes} />
            <BikesSection bikes={bikes} />
            <ReviewsSection />
            <NewsLetterSection />

            <Footer />
        </>
    );
};

export default Home;
import React from 'react';
import './ReviewsSection.css';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Slider from "react-slick";
import { reviews } from '../../fakeData';

const Testimonial = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <section className="reviews_section section">
            <Container fixed>
                <div className="section_header">
                    <h4>Reviews</h4>
                    <h2>Our Customers say</h2>
                    <p>Dolore magna aliqua quis nostrud exercitation ullamco laboris nisi ut aliquip exa comds
                        consequat duis aute irure dolor repreh enderit in voluptate velit esse cilum.</p>
                </div>
                <div className="reviews_slider_wrapper">
                    <Slider {...settings}>
                        {reviews.map((item, ind) => (
                            <div className="reviews_item" key={ind}>
                                <div className="reviews_item_wrapper">
                                    <h2>{item.name}</h2>
                                    <Rating name="read-only" value={item.ratting} readOnly sx={{
                                        color:'var(--primary-color)',
                                        fontSize:'15px'
                                    }} />
                                    <p>
                                        {item.review}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default Testimonial;
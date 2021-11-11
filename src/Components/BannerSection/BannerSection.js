import './BannerSection.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Container from '@mui/material/Container';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


/* --------- Slick Custom Arrow Components ---------- */
function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="slider_next slider_arrow"
            onClick={onClick}
        >
            <ArrowForwardIosIcon className="arrow_icon" />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="slider_prev slider_arrow"
            onClick={onClick}
        >
            <ArrowBackIosNewIcon className="arrow_icon" />
        </button>
    );
}
/* --------- Slick Custom Arrow Components ---------- */

const BannerSection = ({bikes}) => {

    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <Slider {...settings}>

            {bikes.slice(0, 6).map(bike => (
                <div key={bike._id} className="banner_item">
                    <img src={bike.thumbnail} alt={bike.name} />
                    <div className="banner_content">
                        <Container>
                            <h4>TAKING RIDES TO A NEWER LEVEL</h4>
                            <h1>Find the Best Motorbike For you</h1>
                            <Link to="/inventory" className="btn btn_primary">Explore More</Link>
                        </Container>
                    </div>
                </div>
            ))}

        </Slider>
    );
};

export default BannerSection;


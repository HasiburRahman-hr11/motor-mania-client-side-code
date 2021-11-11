import React, { useContext, useEffect, useState } from 'react';
import './SingleProduct.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useParams , useHistory } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';

import year from '../../images/single-year.png';
import category from '../../images/single-category.png';
import brand from '../../images/single-bike.png';
import engine from '../../images/single-engine.png';
import speed from '../../images/single-speed.png';
import useAuth from '../../hooks/useAuth';
import { successNotify, errorNotify } from '../../utils/toastify';
import { OrderContext } from '../../Context/OrderContext/OrderContext';

const SingleProduct = () => {

    const { user } = useAuth();
    const { orders, setOrders } = useContext(OrderContext);
    const params = useParams();
    const history = useHistory();
    const [bike, setBike] = useState({});
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(false);

    const [orderDetails, setOrderDetails] = useState({
        name: user.displayName || '',
        email: user.email || '',
        address: '',
        phone: '',
        productName: bike.name || '',
        productId: bike._id || ''
    });


    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://motor-mania.herokuapp.com/orders/create', orderDetails);
            setOrders({ data, ...orders });
            successNotify('Order placed successfully');
            history.push('/my-orders');
        } catch (error) {
            console.log(error);
            errorNotify('Something went wrong!')
        }
    }

    useEffect(() => {
        const getSingleBike = async () => {
            try {
                const { data } = await axios.get(`https://motor-mania.herokuapp.com/products/${params.id}`)
                setBike(data);
                setOrderDetails({ ...orderDetails, productName: data.name, productId: data._id })
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        getSingleBike();
    }, [params.id]);

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Header />
            <Box component="div" sx={{
                padding: '70px 0'
            }}>
                <Container fixed>
                    <Grid container spacing={4}>
                        <Grid item md={7} xs={12}>
                            <div className="single_product_details">
                                <h2 className="ingle_product_title">{bike.name}</h2>
                                <img src={bike.thumbnail} alt={bike.name} className="single_product_img" />

                                <div className="single_product_info">
                                    <div className="info_item">
                                        <img src={year} alt="Year" />
                                        <h4>Year</h4>
                                        <p>{bike.year}</p>
                                    </div>
                                    <div className="info_item">
                                        <img src={category} alt="Category" />
                                        <h4>Category</h4>
                                        <p>{bike.type}</p>
                                    </div>
                                    <div className="info_item">
                                        <img src={brand} alt="Make" />
                                        <h4>Make</h4>
                                        <p>{bike.brand}</p>
                                    </div>
                                    <div className="info_item">
                                        <img src={engine} alt="Engine Type" />
                                        <h4>ENGINE POWER</h4>
                                        <p>{bike.engineType}</p>
                                    </div>
                                    <div className="info_item">
                                        <img src={speed} alt="Top Speed" />
                                        <h4>TOP SPEED</h4>
                                        <p>{bike.topSpeed}</p>
                                    </div>
                                </div>

                                <div className="product_overview">
                                    <h2>Motorcycle Overview</h2>
                                    <p>{bike.description}</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <div className="order_form_wrapper">
                                <h3>Buy <span style={{
                                    color: 'var(--primary-color)'
                                }}>{bike.name}</span></h3>
                                <form action="" onSubmit={handleOrderSubmit}>
                                    <div className="input_group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                            className="form_control"
                                            required
                                            value={orderDetails.name}
                                            onChange={(e) => setOrderDetails({
                                                ...orderDetails, name: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="input_group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email Address"
                                            className="form_control"
                                            required
                                            value={orderDetails.email}
                                            onChange={(e) => setOrderDetails({
                                                ...orderDetails, email: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="input_group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone Number"
                                            className="form_control"
                                            required
                                            value={orderDetails.phone}
                                            onChange={(e) => setOrderDetails({
                                                ...orderDetails, phone: e.target.value
                                            })}
                                        />
                                    </div>
                                    <div className="input_group">
                                        <label htmlFor="address">Your Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Your Address"
                                            className="form_control"
                                            required
                                            value={orderDetails.address}
                                            onChange={(e) => setOrderDetails({
                                                ...orderDetails, address: e.target.value
                                            })}
                                        />
                                    </div>

                                    <Box component="div" sx={{
                                        mt: '20px'
                                    }}>
                                        <button className="btn btn_primary" type="submit">
                                            {progress ? <CircularProgress sx={{
                                                color: '#fff',
                                                width: '25px !important',
                                                height: '25px !important'
                                            }} /> : 'Submit'}
                                        </button>
                                    </Box>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default SingleProduct;
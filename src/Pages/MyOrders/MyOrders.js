
import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import PageBanner from '../../Components/PageBanner/PageBanner';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useAuth from '../../hooks/useAuth';

import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { successNotify, errorNotify } from '../../utils/toastify';

const MyOrders = () => {

    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleDeleteOrder = async (id) => {
        const agree = window.confirm('Delete this order?');

        if (agree) {
            try {
                await axios.delete(`http://localhost:8000/orders/${id}`);
                const restOrders = myOrders.filter(order => order._id !== id);
                setMyOrders(restOrders);
                
                successNotify('Order deleted successfully');
            } catch (error) {
                console.log(error);
                errorNotify('Something went wrong!')
            }
        }
    }

    useEffect(() => {
        const getMyOrders = async () => {
            try {

                const { data } = await axios.get(`http://localhost:8000/orders/user/${user.email}`)
                setMyOrders(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getMyOrders();
    }, [user]);

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Header />
            <PageBanner title="My Orders" subtitle="The thrill is on" bg="https://wallpapercave.com/wp/wp6291635.jpg" />

            <Box component="div" sx={{
                padding: '50px 0'
            }}>
                <Container fixed>
                    {myOrders.length > 0 ? (
                        <Grid container spacing={3}>
                            {myOrders.map(order => (
                                <Grid item md={6} xs={12} key={order._id}>
                                    <div className="order_item">
                                        <div>
                                            <p>Bike</p>
                                            <h5><Link to={`/bikes/${order.productId}`}>{order.productName}</Link></h5>
                                        </div>
                                        <div>
                                            <p>Ordered by</p>
                                            <h5>{order.name}</h5>
                                        </div>
                                        <div>
                                            <p>Action</p>
                                            <DeleteOutlineIcon
                                                onClick={() => handleDeleteOrder(order._id)}
                                                sx={{
                                                    backgroundColor: '#ddd',
                                                    color: 'var(--primary-color)',
                                                    padding: '5px',
                                                    borderRadius: '50%',
                                                    width: '33px',
                                                    height: '33px',
                                                    cursor: 'pointer'
                                                }} />
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box component="div" sx={{
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                marginBottom: '20px'
                            }}>You haven't placed any order yet </h3>
                            <Link to="/inventory" className="btn btn_primary">Let's Buy</Link>
                        </Box>
                    )}
                </Container>
            </Box>

            <Footer />
        </>
    );
};

export default MyOrders;
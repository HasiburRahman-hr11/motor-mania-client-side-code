
import React, { useEffect, useState } from 'react';
import './Review.css';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import PageBanner from '../../Components/PageBanner/PageBanner';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useAuth from '../../hooks/useAuth';

import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import { successNotify, errorNotify } from '../../utils/toastify';

const Reviews = () => {

    const { user } = useAuth();
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleDeleteReview = async (id) => {
        const agree = window.confirm('Delete this review?');

        if (agree) {
            try {
                await axios.delete(`https://motor-mania.herokuapp.com/reviews/${id}`);
                const restReviews = myReviews.filter(review => review._id !== id);
                setMyReviews(restReviews);

                successNotify('Review deleted successfully');
            } catch (error) {
                console.log(error);
                errorNotify('Something went wrong!')
            }
        }
    }

    useEffect(() => {
        const getMyReviews = async () => {
            try {

                const { data } = await axios.get(`https://motor-mania.herokuapp.com/reviews/user/${user.email}`)
                setMyReviews(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getMyReviews();
    }, [user]);

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Header />
            <PageBanner title="My reviews" subtitle="We care about your thoughts" bg="https://wallpapercave.com/wp/wp6237989.jpg" />

            <Box component="div" sx={{
                padding: '50px 0'
            }}>
                <Container fixed>
                    {myReviews.length > 0 ? (
                        <>
                            <Grid container spacing={3}>
                                {myReviews.map(review => (
                                    <Grid item md={4} sm={6} xs={12} key={review._id}>
                                        <div className="review_item">
                                            <Box component="div" sx={{
                                                display:'flex',
                                                justifyContent:'space-between',
                                                mb:'20px'
                                            }}>
                                                <div>
                                                    <h3>{review.name}</h3>
                                                    <p><Rating name="read-only" value={review.rating} readOnly sx={{
                                                        color:'var(--primary-color)',
                                                        fontSize:'16px'
                                                    }} /></p>
                                                </div>
                                                <DeleteOutlineIcon
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    sx={{
                                                        backgroundColor: '#ddd',
                                                        color: 'var(--primary-color)',
                                                        padding: '5px',
                                                        borderRadius: '50%',
                                                        width: '33px',
                                                        height: '33px',
                                                        cursor: 'pointer'
                                                    }} />
                                            </Box>

                                            <p style={{
                                                fontSize:'14px',
                                                color:'#666',
                                                lineHeight:'23px'
                                            }}>{review.review}</p>

                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box component="div" sx={{
                                mt: '30px',
                                textAlign: 'center'
                            }}>
                                <Link to="/review/add" className="btn btn_primary">Give a Review</Link>
                            </Box>
                        </>
                    ) : (
                        <Box component="div" sx={{
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                marginBottom: '20px'
                            }}>You haven't provided any review yet </h3>
                            <Link to="/review/add" className="btn btn_primary">Give a Review</Link>
                        </Box>
                    )}
                </Container>
            </Box>

            <Footer />
        </>
    );
};

export default Reviews;
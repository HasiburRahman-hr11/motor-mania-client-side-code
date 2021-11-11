import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Rating from '@mui/material/Rating';
import useAuth from '../../hooks/useAuth';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {ReviewContext} from '../../Context/ReviewContext/ReviewContext';
import { successNotify, errorNotify } from '../../utils/toastify';

const AddReview = () => {
    const {user} = useAuth();
    const history = useHistory();
    const {reviews , setReviews} = useContext(ReviewContext);
    const [rating, setRating] = useState(0);
    const [reviewData , setReviewData] = useState({
        name: user.displayName || '',
        email:user.email || '',
        review:'',
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(rating === 0){
            alert('Please give some starts!')
        }else{
            try {
                const reviewInfo = {
                    ...reviewData,
                    rating
                }
                const {data} = await axios.post('http://localhost:8000/reviews/create' , reviewInfo);
                setReviews({data , ...reviews});
                successNotify('Review added successfully');
                history.push('/review');
            } catch (error) {
                console.log(error);
                errorNotify('Something went wrong!')
            }
        }
    }
    return (
        <>
            <Header />
            <Box component="div" sx={{
                padding: '50px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <Container fixed>
                    <Box component="div" sx={{
                        maxWidth: '450px',
                        backgroundColor: '#fff',
                        padding: '30px 20px',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
                        margin: '0 auto',
                    }}>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="input_group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="form_control"
                                    required
                                    value={reviewData.name}
                                    onChange={(e)=>setReviewData({...reviewData , name:e.target.value})}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form_control"
                                    required
                                    value={reviewData.email}
                                    onChange={(e)=>setReviewData({...reviewData , email:e.target.value})}
                                />
                            </div>
                            <div className="input_group">
                                <textarea
                                    name="review"
                                    placeholder="Feedback"
                                    className="form_control"
                                    required
                                    value={reviewData.review}
                                    onChange={(e)=>setReviewData({...reviewData , review:e.target.value})}
                                />
                            </div>
                            <Box component="div" sx={{
                                    display:'flex',
                                    alignItems:'center',
                                    fontSize:'16px',
                                    color:'#444'
                                }}>
                                <h5 >Give some stars</h5>
                                <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                        sx={{
                                            color:'var(--primary-color)',
                                            fontSize:'18px',
                                            marginLeft:'10px',
                                            alignItems:'center',
                                        }}
                                    />
                            </Box>
                            <Box component="div" sx={{
                                mt: '20px',
                                textAlign: 'center'
                            }}>
                                <button className="btn btn_primary">Submit</button>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default AddReview;
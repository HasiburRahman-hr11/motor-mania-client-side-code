import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';
import { OrderContext } from '../../../Context/OrderContext/OrderContext';
import Loading from '../../../Components/Loading/Loading';

const EditOrder = () => {

    const { id } = useParams();
    const history = useHistory();

    const { orders, setOrders } = useContext(OrderContext);
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({
        status: ''
    });
    const [progress, setProgress] = useState(false)

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true);
        try {
            const { data } = await axios.put(`http://localhost:8000/orders/${id}`, orderData);
            const restOrders = orders.filter(order => order._id !== data._id);
            const newOrders = [data, ...restOrders]
            const sortedOrders = newOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sortedOrders);
            successNotify('Order updated successfully');
            setProgress(false);
            history.push('/admin/orders');
        } catch (error) {
            console.log(error);
            errorNotify('Something went wrong!');
            setProgress(false);
        }
    }

    useEffect(() => {
        const getOrderInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/orders/${id}`);
                setOrder(data);
                setOrderData({ ...orderData, status: data.status })
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getOrderInfo();
    }, [id]);

    if (loading) {
        return <Loading />
    }


    return (
        <>
            <Navbar />
            <Box component="div" className="admin-page add-bike">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily: "'Oswald', sans-serif",
                    color: 'var(--primary-color)'
                }}>
                    Edit Order
                </Typography>

                <Box component="div" sx={{
                    padding: '30px 20px',
                    borderRadius: '5px',
                    backgroundColor: '#fff'
                }}>
                    <form action="" onSubmit={handleSubmit}>

                        <Grid container spacing={3}>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <label htmlFor="status">Order Status</label>
                                    <select
                                        name="status"
                                        id="status"
                                        value={orderData.status}
                                        onChange={handleChange}
                                        className="form_control"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                    </select>
                                </div>
                            </Grid>
                        </Grid>

                        <Box component="div" sx={{
                            mt: '30px'
                        }}>
                            <button className="btn btn_primary" type="submit">
                                {progress ? <CircularProgress sx={{
                                    color: '#fff',
                                    width: '25px !important',
                                    height: '25px !important'
                                }} /> : 'Update Order'}
                            </button>
                        </Box>

                    </form>
                </Box>

            </Box>
        </>
    );
};

export default EditOrder;
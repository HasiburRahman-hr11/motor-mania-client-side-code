import React, { useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Loading from '../../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';
import { OrderContext } from '../../../Context/OrderContext/OrderContext';

const AllOrders = () => {

    const { orders, setOrders, loading } = useContext(OrderContext);

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <Box component="div" className="admin-page all-bikes">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily: "'Oswald', sans-serif"
                }}>
                    All Orders
                </Typography>

                <Box component="div">
                    {orders.length > 0 ? (
                        <ul className="admin_orders_list">
                            {orders.map(order => (
                                <li key={order._id} className="order_item">
                                    <Box component="div" sx={{
                                        width: {
                                            md: '60%',
                                            xs: '100%'
                                        },
                                        textAlign: 'left'
                                    }}>
                                        <p>Bike</p>
                                        <h5><Link to={`/bikes/${order.productId}`}>{order.productName}</Link></h5>
                                    </Box>
                                    <Box component="div" sx={{
                                        width: {
                                            md: '30%',
                                            xs: '100%'
                                        },
                                        textAlign: 'left'
                                    }}>
                                        <p>Ordered by</p>
                                        <h5>{order.name}</h5>
                                    </Box>
                                    <Box component="div" sx={{
                                        width: {
                                            md: '30%',
                                            xs: '100%'
                                        },
                                        textAlign: 'right'
                                    }}>
                                        <p>Action</p>
                                        <Box component="div" sx={{
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'flex-end !important'
                                        }}>
                                            <DeleteOutlineIcon
                                                className="admin_edit_icon"
                                                sx={{
                                                    width: '35px',
                                                    height: '35px',
                                                    cursor: 'pointer'
                                                }} />

                                            <Link to={`/admin/orders/edit/${order._id}`}>
                                                <EditIcon className="admin_edit_icon" sx={{
                                                    width: '35px',
                                                    height: '35px',
                                                    marginLeft:'10px'
                                                }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Box component="div" sx={{
                            height: 'calc(100vh - 100px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h4" component="h4" sx={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: '#999',
                                fontFamily: "'Oswald', sans-serif"
                            }}>
                                No Order Found.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AllOrders;
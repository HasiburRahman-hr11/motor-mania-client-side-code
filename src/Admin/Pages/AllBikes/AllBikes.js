import React, { useContext } from 'react';
import './AllBikes.css';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProductContext } from '../../../Context/ProductContext/ProductContext';
import Loading from '../../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';

const AllBikes = () => {
    const { bikes, loading, setBikes } = useContext(ProductContext);

    const handleDeleteBike = async (id) => {
        const agree = window.confirm('Delete this bike?');

        if (agree) {
            try {
                await axios.delete(`https://motor-mania.herokuapp.com/products/${id}`);
                const restBikes = bikes.filter(bike => bike._id !== id);
                setBikes(restBikes);
                successNotify('Bike deleted successfully');
            } catch (error) {
                console.log(error);
                errorNotify('Something went wrong!')
            }
        }
    }

    return (
        <>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <Box component="div" className="admin-page all-bikes">
                    <Typography variant="h4" component="h4" sx={{
                        fontSize: '22px',
                        fontWeight: 'bold',
                        mb: '25px',
                        fontFamily: "'Oswald', sans-serif"
                    }}>
                        All Bikes
                    </Typography>

                    <Box component="div">
                        <ul className="admin_bikes_list">
                            {bikes.map(bike => (
                                <li key={bike._id}>
                                    {bike.thumbnail && (
                                        <img src={bike.thumbnail} alt={bike.name} />
                                    )}
                                    <div className="admin_bike_info">
                                        <h4><Link to={`/bikes/${bike._id}`}>{bike.name}</Link></h4>
                                        <p>
                                            <span>Model: <strong>{bike.model}</strong></span>
                                            <span>Brand: <strong>{bike.brand}</strong></span>
                                        </p>
                                    </div>
                                    <div className="admin_bike_action">
                                        <DeleteOutlineIcon 
                                        onClick={()=>handleDeleteBike(bike._id)}
                                        className="admin_delete_icon" sx={{
                                            width: '35px',
                                            height: '35px',
                                            marginRight: '10px'
                                        }} />
                                        <Link to={`/admin/bikes/edit/${bike._id}`}>
                                            <EditIcon className="admin_edit_icon" sx={{
                                                width: '35px',
                                                height: '35px'
                                            }} />
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AllBikes;
import React, { useContext, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {useHistory} from 'react-router-dom';

import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';
import { ProductContext } from '../../../Context/ProductContext/ProductContext';

const AddBike = () => {

    const history = useHistory();
    const {bikes , setBikes} = useContext(ProductContext);
    const [bikeData, setBikeData] = useState({
        name: '',
        brand: '',
        model: '',
        price: '',
        year: '',
        type: '',
        engineType: '',
        topSpeed: '',
        power: '',
        displacement: '',
        stroke: '',
        description: '',
        thumbnail: ''
    });
    const [progress , setProgress] = useState(false)

    const handleChange = (e) => {
        setBikeData({ ...bikeData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true);
        try {
            const { data } = await axios.post('https://motor-mania.herokuapp.com/products/create', bikeData);
            setBikeData({
                name: '',
                brand: '',
                model: '',
                price: '',
                year: '',
                type: '',
                engineType: '',
                topSpeed: '',
                power: '',
                displacement: '',
                stroke: '',
                description: '',
                thumbnail: ''
            });

            setBikes([data , ...bikes]);
            successNotify('Bike added successfully');
            setProgress(false);
            history.push('/admin/bikes');
        } catch (error) {
            console.log(error);
            errorNotify('Something went wrong!');
            setProgress(false);
        }
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
                    Add New Bike
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
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Bike Name"
                                        className="form_control"
                                        required
                                        value={bikeData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="model"
                                        placeholder="Model"
                                        className="form_control"
                                        required
                                        value={bikeData.model}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="brand"
                                        placeholder="Brand"
                                        className="form_control"
                                        required
                                        value={bikeData.brand}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container spacing={3}>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Price"
                                        className="form_control"
                                        required
                                        value={bikeData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="year"
                                        placeholder="Year"
                                        className="form_control"
                                        required
                                        value={bikeData.year}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="type"
                                        placeholder="Type"
                                        className="form_control"
                                        required
                                        value={bikeData.type}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container spacing={3}>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="engineType"
                                        placeholder="Engine Type"
                                        className="form_control"
                                        required
                                        value={bikeData.engineType}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="topSpeed"
                                        placeholder="Top Speed (e.g. 250+ mph)"
                                        className="form_control"
                                        required
                                        value={bikeData.topSpeed}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="displacement"
                                        placeholder="Displacement (e.g. 999cc)"
                                        className="form_control"
                                        required
                                        value={bikeData.displacement}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <Grid container spacing={3}>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="power"
                                        placeholder="Power (e.g. 205hp)"
                                        className="form_control"
                                        value={bikeData.power}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="stroke"
                                        placeholder="Stroke"
                                        className="form_control"
                                        value={bikeData.stroke}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <div className="input_group">
                                    <input
                                        type="text"
                                        name="thumbnail"
                                        placeholder="Thumbnail"
                                        className="form_control"
                                        value={bikeData.thumbnail}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <div className="input_group">
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="form_control"
                                value={bikeData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <Box component="div" sx={{
                            mt: '30px'
                        }}>
                            <button className="btn btn_primary" type="submit">
                            {progress ? <CircularProgress sx={{
                                    color: '#fff',
                                    width: '25px !important',
                                    height: '25px !important'
                                }} /> : 'Add Bike'}
                            </button>
                        </Box>

                    </form>
                </Box>

            </Box>
        </>
    );
};

export default AddBike;
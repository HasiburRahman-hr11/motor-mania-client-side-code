import { Grid } from '@mui/material';
import React from 'react';
import './Bike.css';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Bike = ({ bike }) => {
    return (
        <div className="product">
            <div className="product_top">
                <h3 className="product_title">{bike.name}</h3>
                <h4 className="product_price">${bike.price}</h4>
            </div>
            <div className="product_middle">
                <Link to={`/packages/${bike._id}`}>
                    <img src={bike.thumbnail} alt={bike.name} className="product_thumbnail" />
                    <div className="thumbnail_overlay">
                        <AddIcon sx={{
                            color:'#fff',
                            width:'70px',
                            height:'70px',
                            fontWeight:'normal'
                        }}/>
                    </div>
                </Link>
            </div>
            <div className="product_bottom">
                <Grid container spacing={3} className="product_meta">
                    <Grid item sm={4} xs={4} className="product_meta_item">
                        <h4>Year</h4>
                        <p>{bike.year}</p>
                    </Grid>
                    <Grid item sm={4} xs={4} className="product_meta_item">
                        <h4>Type</h4>
                        <p style={{ textTransform: 'capitalize' }}> {bike.type}</p>
                    </Grid>
                    <Grid item sm={4} xs={4} className="product_meta_item">
                        <h4>Brand</h4>
                        <p style={{ textTransform: 'uppercase' }}>{bike.brand}</p>
                    </Grid>
                </Grid>



                <Grid container spacing={3} className="product_spaces">
                    <Grid item sm={6} xs={12} className="product_space_item">
                        <div>
                            <h4>Engine Type</h4>
                            <p>{bike.engineType}</p>
                        </div>
                        <div>
                            <h4>DISPLACEMENT</h4>
                            <p>{bike.displacement}</p>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} className="product_space_item">
                        <div>
                            <h4>ENGINE POWER</h4>
                            <p>{bike.power}</p>
                        </div>
                        <div>
                            <h4>BORE/STROKE</h4>
                            <p>{bike.stroke}</p>
                        </div>
                    </Grid>
                </Grid>


                <div className="product_btn">
                    <Link to={`/packages/${bike._id}`} className="btn btn-primary">Buy Now</Link>
                </div>

            </div>


        </div>
    );
};

export default Bike;
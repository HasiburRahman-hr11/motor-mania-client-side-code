import React, { useContext } from 'react';
import './BikesSection.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Bike from '../Bike/Bike';
import { Link } from 'react-router-dom';
import {ProductContext} from '../../Context/ProductContext/ProductContext'
const BikesSection = () => {
    const {bikes} = useContext(ProductContext)
    return (
        <section className="section home-bikes">
            <Container fixed>
                <div className="section_header">
                    <h4>TAKING RIDES TO A NEWER LEVEL</h4>
                    <h2>CHOOSE A MOTORCYCLE</h2>
                    <p>Dolore magna aliqua quis nostrud exercitation ullamco laboris nisi ut aliquip exa comds
                        consequat duis aute irure dolor repreh enderit in voluptate velit esse cilum.</p>
                </div>
                <div className="section_body">
                    <Grid container spacing={3}>
                        {bikes.map(bike => (
                            <Grid item lg={4} md={6} xs={12} key={bike._id}>
                                <Bike bike={bike} />
                            </Grid>
                        ))}
                    </Grid>

                    <div className="section_more_btn">
                        <Link to="/inventory" className="btn btn_primary">Explore More</Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BikesSection;
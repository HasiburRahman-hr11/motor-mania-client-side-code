import React from 'react';
import './BikesSection.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { bikes } from '../../fakeData';
import Bike from '../Bike/Bike';
import { Link } from 'react-router-dom';

const BikesSection = () => {
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
                            <Grid item md={4} xs={12} key={bike._id}>
                                <Bike bike={bike} />
                            </Grid>
                        ))}
                    </Grid>

                    <div className="section_more_btn">
                        <Link to="/shop" className="btn btn-primary">Explore More</Link>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BikesSection;
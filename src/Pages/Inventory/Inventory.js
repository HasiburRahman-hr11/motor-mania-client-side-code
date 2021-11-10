import React from 'react';
import './Inventory.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { bikes } from '../../fakeData';
import Bike from '../../Components/Bike/Bike';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageBanner from '../../Components/PageBanner/PageBanner';

const Shop = () => {
    return (
        <>
            <Header />
            <Box component="div" sx={{
                paddingBottom: '50px'
            }}>
                <PageBanner title="Inventory" subtitle="TAKING RIDES TO A NEWER LEVEL" bg="https://images.pexels.com/photos/2317408/pexels-photo-2317408.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                <Container fixed>
                    <Grid container spacing={3}>
                        {bikes.map(bike => (
                            <Grid item lg={4} md={6} xs={12} key={bike._id}>
                                <Bike bike={bike} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Shop;
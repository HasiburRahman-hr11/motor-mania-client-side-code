import React from 'react';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Box from '@mui/material/Box';

const Payment = () => {
    return (
        <>
            <Header />
                <Box component="div" sx={{
                    padding:'100px 0',
                    textAlign:'center'
                }}>
                    <h3>Payment Coming Soooooon</h3>
                </Box>
            <Footer/>
        </>
    );
};

export default Payment;
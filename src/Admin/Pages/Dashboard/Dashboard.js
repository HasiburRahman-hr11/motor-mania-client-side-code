import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <Box component="div" className="admin-page dashboard">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily:"'Oswald', sans-serif"
                }}>
                    Dashboard
                </Typography>


            </Box>
        </>
    );
};

export default Dashboard;
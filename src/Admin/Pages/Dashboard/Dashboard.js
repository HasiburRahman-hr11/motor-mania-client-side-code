import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useAuth from '../../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <>
            <Navbar />
            <Box component="div" className="admin-page dashboard">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily: "'Oswald', sans-serif"
                }}>
                    Dashboard
                </Typography>

                <Box component="div" sx={{
                    height: 'calc(100vh - 150px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign:'center'
                }}>
                    <div>
                        <h2>Hello, <span style={{ color: 'var(--primary-color)' }}>{user.displayName}</span> </h2>
                        <h3>Welcome to the Dashboard</h3>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
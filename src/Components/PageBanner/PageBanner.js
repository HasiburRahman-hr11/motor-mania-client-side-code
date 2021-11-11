import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const PageBanner = ({ bg, title, subtitle }) => {
    return (
        <Box component="div" className="page_banner" sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0,0, 0.6)), url(${bg})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            padding: '50px 0',
            minHeight: {
                md: '370px',
                sm: '250px',
                xs: '200px'
            },
            clipPath: 'polygon(100% 0, 100% 80%, 50% 100%, 0 80%, 0 0)',
            marginBottom:{
                md:'70px',
                xs:'20px'
            }
        }}>
            <Box component="div" sx={{
                textAlign:'center'
            }}>
                <Typography variant="h4" component="h4" sx={{
                    fontSize: {
                        sm: '18px',
                        xs: '16px'
                    },
                    textTransform: 'uppercase',
                    color:'var(--primary-color)',
                    fontFamily:"'Oswald', sans-serif",
                    fontWeight:'600'
                }}>
                    {subtitle}
                </Typography>
                <Typography variant="h2" component="h2" sx={{
                    fontSize: {
                        md: '35px',
                        sm: '25px',
                        xs: '20px'
                    },
                    textTransform: 'uppercase',
                    color:'#fff',
                    fontFamily:"'Oswald', sans-serif",
                    fontWeight:'600'
                }}>
                   {title}
                </Typography>
            </Box>
        </Box >
    );
};

export default PageBanner;
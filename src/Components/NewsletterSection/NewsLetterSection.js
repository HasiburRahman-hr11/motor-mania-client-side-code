import React from 'react';
import './NewsLetterSection.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const NewsLetterSection = () => {
    return (
        <div className="section newsletter_section">
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <h4>LATEST NEWS AND DEALS DIRECTLY TO YOUR INBOX</h4>
                        <h2>SUBSCRIBE FOR UPDATED</h2>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <div className="newsletter_box">
                            <input type="email" name="email" placeholder="Email Address" />
                            <button type="button">Submit</button>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default NewsLetterSection;
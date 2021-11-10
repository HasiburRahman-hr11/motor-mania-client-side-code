import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Signin = () => {
    const [signInInfo, setSignInInfo] = useState({
        email: '',
        password: ''
    });

    const handleSignUp = (e) => {
        e.preventDefault();

        console.log(signInInfo)
    }
    return (
        <Box component="div" sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            height: '100%'
        }}>
            <Container fixed>
                <div className="auth_form_wrapper">
                    <h2>Sign in</h2>
                    <form action="" className="auth_form" onSubmit={handleSignUp}>
                        <div className="input_group">
                            <input
                                type="email"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                required
                                value={signInInfo.email}
                                onChange={(e) => setSignInInfo({ ...signInInfo, email: e.target.value })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Password"
                                name="password"
                                required
                                value={signInInfo.password}
                                onChange={(e) => setSignInInfo({ ...signInInfo, password: e.target.value })}
                            />
                        </div>

                        <Box component="div" sx={{
                            textAlign: 'center',
                            marginTop: '30px'
                        }}>
                            <button type="submit" className="btn btn_primary">Signin</button>
                        </Box>

                        <div className="auth_toggler">
                            Don't have an account?
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </Container>
        </Box>
    );
};

export default Signin;
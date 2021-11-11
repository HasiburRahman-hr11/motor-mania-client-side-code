import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

import useAuth from '../../hooks/useAuth';

const Signin = () => {
    const { firebaseSignIn , progress } = useAuth();
    const location = useLocation();
    const history = useHistory();

    // Form Validation using react-hook-form and yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = data => {
        firebaseSignIn(data.email, data.password, location, history)
    };

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
                    <form action="" className="auth_form" onSubmit={e => e.preventDefault()}>
                        <div className="input_group">
                            <input
                                type="email"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Password"
                                name="password"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <p className="form_error">{errors.password.message}</p>}
                        </div>

                        <Box component="div" sx={{
                            textAlign: 'center',
                            marginTop: '30px'
                        }}>
                            <button type="submit"
                                className="btn btn_primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {progress ? <CircularProgress sx={{
                                    color: '#fff',
                                    width: '25px !important',
                                    height: '25px !important'
                                }} /> : 'Sign In'}
                            </button>
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
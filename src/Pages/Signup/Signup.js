import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import useAuth from '../../hooks/useAuth';

const Signup = () => {

    const { firebaseSignUp } = useAuth();
    const location = useLocation();
    const path = location.state?.from.pathname || '/';
    const history = useHistory();

    // Form Validation using react-hook-form and yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Name is required'),
        lastName: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Please confirm your password ')
            .oneOf([Yup.ref('password')], 'Passwords do not match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = data => {
        console.log(data);
    };

    const [signUpInfo, setSignUpInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignUp = (e) => {
        e.preventDefault();

        console.log(signUpInfo)
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
                    <h2>Sign up</h2>
                    <form action="" className="auth_form" onSubmit={e => e.preventDefault()}>
                        <div className="input_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="First Name"
                                name="firstName"
                                {...register("firstName", { required: true })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="Last Name"
                                name="lastName"
                                {...register("lastName", { required: true })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="email"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                required
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Password"
                                name="password"
                                {...register('password', { required: true })}
                            />
                        </div>
                        <div className="input_group">
                            <input
                                type="password"
                                className="form_control"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                {...register('confirmPassword', { required: true })}
                            />
                        </div>

                        <Box component="div" sx={{
                            textAlign: 'center',
                            marginTop: '30px'
                        }}>
                            <button type="submit" className="btn btn_primary">Signup</button>
                        </Box>

                        <div className="auth_toggler">
                            Already have an account?
                            <Link to="/signin">Sign In</Link>
                        </div>
                    </form>
                </div>
            </Container>
        </Box>
    );
};

export default Signup;
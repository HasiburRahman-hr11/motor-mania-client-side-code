import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';
import { UserContext } from '../../../Context/UserContext/UserContext';
import Loading from '../../../Components/Loading/Loading';

const EditUser = () => {

    const { id } = useParams();
    const history = useHistory();

    const { users, setUsers } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        role: '',
        userName: '',
    });
    const [progress, setProgress] = useState(false)

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(true);
        try {
            const { data } = await axios.put(`https://motor-mania.herokuapp.com/users/${id}`, userData);
            const restUsers = users.filter(user => user._id !== data._id);
            const newUsers = [data, ...restUsers]
            const sortedUsers = newUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setUsers(sortedUsers);
            successNotify('User updated successfully');
            setProgress(false);
            history.push('/admin/users');
        } catch (error) {
            console.log(error);
            errorNotify('Something went wrong!');
            setProgress(false);
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await axios.get(`https://motor-mania.herokuapp.com/users/find/${id}`);
                setUserData({role: data.role, userName: data.userName })
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getUserInfo();
    }, [id]);

    if (loading) {
        return <Loading />
    }


    return (
        <>
            <Navbar />
            <Box component="div" className="admin-page add-bike">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily: "'Oswald', sans-serif",
                    color: 'var(--primary-color)'
                }}>
                    Edit Order
                </Typography>

                <Box component="div" sx={{
                    padding: '30px 20px',
                    borderRadius: '5px',
                    backgroundColor: '#fff'
                }}>
                    <form action="" onSubmit={handleSubmit}>

                        <Grid container spacing={3}>
                            <Grid item sm={6} xs={12}>
                                <div className="input_group">
                                    <label htmlFor="userName">User Name</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        value={userData.userName}
                                        onChange={handleChange}
                                        className="form_control"
                                    />
                                </div>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <div className="input_group">
                                    <label htmlFor="role">User Role</label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={userData.role}
                                        onChange={handleChange}
                                        className="form_control"
                                    >
                                        <option value="subscriber">Subscriber</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </Grid>
                        </Grid>

                        <Box component="div" sx={{
                            mt: '30px'
                        }}>
                            <button className="btn btn_primary" type="submit">
                                {progress ? <CircularProgress sx={{
                                    color: '#fff',
                                    width: '25px !important',
                                    height: '25px !important'
                                }} /> : 'Update Order'}
                            </button>
                        </Box>

                    </form>
                </Box>

            </Box>
        </>
    );
};

export default EditUser;
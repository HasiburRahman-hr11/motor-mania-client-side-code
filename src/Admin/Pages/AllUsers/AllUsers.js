import React, { useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Loading from '../../../Components/Loading/Loading';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import { successNotify, errorNotify } from '../../../utils/toastify';
import { UserContext } from '../../../Context/UserContext/UserContext';

const AllUsers = () => {

    const { users, setUsers, loading } = useContext(UserContext);

    const handleDeleteUser = async (id) => {
        const agree = window.confirm('Delete this user?');

        if (agree) {
            try {
                await axios.delete(`https://motor-mania.herokuapp.com/users/${id}`);
                const resUsers = users.filter(user => user._id !== id);
                setUsers(resUsers);
                successNotify('User deleted successfully');
            } catch (error) {
                console.log(error);
                errorNotify('Something went wrong!')
            }
        }
    }

    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <Box component="div" className="admin-page all-bikes">
                <Typography variant="h4" component="h4" sx={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    mb: '25px',
                    fontFamily: "'Oswald', sans-serif"
                }}>
                    All Users
                </Typography>

                <Box component="div">
                    {users.length > 0 ? (
                        <ul className="admin_orders_list">
                            {users.map(user => (
                                <li key={user._id} className="order_item">
                                    <Box component="div" sx={{
                                        width: {
                                            sm: '40%',
                                            xs: '100%'
                                        },
                                        textAlign: 'left'
                                    }}>
                                        <p>Email</p>
                                        <h5>{user.email}</h5>
                                    </Box>
                                    <Box component="div" sx={{
                                        width: {
                                            sm: '30%',
                                            xs: '100%'
                                        },
                                        textAlign: 'left'
                                    }}>
                                        <p>Name</p>
                                        <h5 style={{textTransform:'capitalize'}}>{user.userName}</h5>
                                    </Box>
                                    <Box component="div" sx={{
                                        width: {
                                            sm: '15%',
                                            xs: '100%'
                                        },
                                        textAlign: 'left'
                                    }}>
                                        <p>Role</p>
                                        <h5 style={{textTransform:'capitalize'}}>{user.role}</h5>
                                    </Box>
                                    <Box component="div" sx={{
                                        width: {
                                            sm: '15%',
                                            xs: '100%'
                                        },
                                        textAlign: 'right'
                                    }}>
                                        <p>Action</p>
                                        <Box component="div" sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end !important'
                                        }}>
                                            <DeleteOutlineIcon
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="admin_edit_icon"
                                                sx={{
                                                    width: '35px',
                                                    height: '35px',
                                                    cursor: 'pointer'
                                                }} />

                                            <Link to={`/admin/users/edit/${user._id}`}>
                                                <EditIcon className="admin_edit_icon" sx={{
                                                    width: '35px',
                                                    height: '35px',
                                                    marginLeft: '10px'
                                                }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Box component="div" sx={{
                            height: 'calc(100vh - 100px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h4" component="h4" sx={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: '#999',
                                fontFamily: "'Oswald', sans-serif"
                            }}>
                                No User Found.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AllUsers;
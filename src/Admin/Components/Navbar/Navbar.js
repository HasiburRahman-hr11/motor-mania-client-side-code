import React, { useState } from 'react';
import './Navbar.css';
import Box from '@mui/material/Box';
import { Link, NavLink } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import AddIcon from '@mui/icons-material/Add';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <>
            <Box component="div" className={openMenu ? 'admin-navbar active' : 'admin-navbar'}>
                <Typography variant="h3" component="h3" sx={{
                    color: '#fff',
                    fontSize: '20px',
                    padding: '20px 0',
                    fontWeight: 'bold',
                    paddingLeft: '35px',
                    fontFamily: "'Oswald', sans-serif"
                }}>
                    <Link to="/">Motor Mania</Link>
                </Typography>
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    minHeight: '90vh',
                    padding: '0 30px 30px 30px'
                }}>
                    <ul className="admin-menu" onClick={() => setOpenMenu(false)}>
                        <li>
                            <NavLink to="/admin/dashboard">
                                <AppsIcon className="admin-menu-icon" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/bikes">
                                <TwoWheelerIcon className="admin-menu-icon" />
                                Bikes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/bikes/add">
                                <AddIcon className="admin-menu-icon" />
                                Add Bike
                            </NavLink>
                        </li>
                    </ul>

                    <Box component="div" onClick={() => setOpenMenu(false)}>
                        <p className="admin-logout">
                            <LogoutIcon className="admin-menu-icon" />
                            Logout
                        </p>
                    </Box>
                </Box>
            </Box>

            {/* Responsive Top Bar */}
            <Box component="div" className="responsive-topbar" sx={{
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1E323E',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                padding: '0 30px'
            }}>
                <MenuIcon sx={{
                    width: '40px',
                    height: '40px',
                    color: '#fff',
                    cursor: 'pointer'
                }}
                    onClick={() => setOpenMenu(true)}
                />
            </Box>

            <Box component="div" className={openMenu ? 'navbar-overlay active' : 'navbar-overlay'} onClick={() => setOpenMenu(false)}></Box>
        </>
    );
};

export default Navbar;
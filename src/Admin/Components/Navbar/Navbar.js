import React, { useState } from 'react';
import './Navbar.css';
import Box from '@mui/material/Box';
import { Link, NavLink } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

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
                    paddingLeft: '35px'
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
                            <NavLink to="/admin">
                                <AppsIcon className="admin-menu-icon" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/services">
                                <MedicalServicesIcon className="admin-menu-icon" />
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/appointments">
                                <CalendarTodayIcon className="admin-menu-icon" />
                                Appointments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/users">
                                <PeopleOutlineIcon className="admin-menu-icon" />
                                Manage Users
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
                backgroundColor: 'var(--primary-color)',
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
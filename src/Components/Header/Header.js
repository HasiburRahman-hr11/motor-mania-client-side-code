import React, { useState } from 'react';
import './Header.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Link, NavLink } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Logout from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';

import logo from '../../images/logo.png';
import useAuth from '../../hooks/useAuth';

const Header = () => {

    const { user } = useAuth();

    const [sticky, setSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Material UI Menu
    const handleMenuIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuIconClose = () => {
        setAnchorEl(null);
    };


    // Set Sticky Menu
    window.onscroll = (e) => {
        setSticky(window.pageYOffset > 500 ? true : false)
        return () => (window.onscroll = null)
    }


    return (
        <header className={sticky ? 'header sticky' : 'header'}>
            <Container fixed>
                <Grid container sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Grid item xs={6} md={3}>
                        <div className="header_left">
                            <Link to="/">
                                <img src={logo} alt="Logo" className="logo" />
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={9} sx={{
                        position: 'relative'
                    }} >
                        <div className={menuOpen ? `header_right active` : 'header_right'}>
                            <CloseIcon className="menu_close" onClick={() => setMenuOpen(false)} />
                            <nav>
                                <ul className="main_menu">
                                    <li className="menu_item" onClick={() => setMenuOpen(false)}>
                                        <NavLink exact to="/" activeClassName="active">Home</NavLink>
                                    </li>
                                    <li className="menu_item" onClick={() => setMenuOpen(false)}>
                                        <NavLink exact to="/inventory" activeClassName="active">Inventory</NavLink>
                                    </li>
                                    <li className="menu_item" onClick={() => setMenuOpen(false)}>
                                        <NavLink exact to="/about" activeClassName="active">About Us</NavLink>
                                    </li>
                                    <li className="menu_item" onClick={() => setMenuOpen(false)}>
                                        <NavLink exact to="/contact" activeClassName="active">Contact Us</NavLink>
                                    </li>

                                    {user.email || user.displayName ? (
                                        <IconButton onClick={handleMenuIconClick} size="small">
                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                {user?.displayName?.substr(0, 1).toUpperCase()}
                                            </Avatar>
                                        </IconButton>
                                    ) : (
                                        <li className="menu_item" onClick={() => setMenuOpen(false)}>
                                            <Link exact to="/signin" activeClassName="active">Sign In</Link>
                                        </li>
                                    )}


                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuIconClose}
                                        onClick={handleMenuIconClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >

                                        <MenuItem onClick={() => setMenuOpen(false)}>
                                            <Avatar /> Hello
                                        </MenuItem>
                                        <MenuItem onClick={() => setMenuOpen(false)}>

                                            <Link to="/my-orders" className="menu_link">
                                                <Avatar >5</Avatar >
                                                My Orders
                                            </Link>
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            setMenuOpen(false);
                                        }}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                        {user.isAdmin && (
                                            <>
                                                <Divider />
                                                <MenuItem onClick={() => {
                                                    setMenuOpen(false);
                                                }}>
                                                    <Link to="/admin/dashboard" className="menu_link">
                                                        <ListItemIcon>
                                                            <Logout fontSize="small" />
                                                        </ListItemIcon>
                                                        Dashboard
                                                    </Link>
                                                </MenuItem>
                                            </>
                                        )}

                                    </Menu>
                                </ul>
                            </nav>





                        </div>

                        <MenuOpenIcon className="menu_open" onClick={() => setMenuOpen(true)} />
                        <div className={menuOpen ? `header_overlay active` : 'header_overlay'} onClick={() => setMenuOpen(false)}></div>
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default Header;
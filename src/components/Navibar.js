import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

export function Navibar() {
    const [auth, setAuth] = React.useState(true);
    const [mainMenuAnchorEl, setMainMenuAnchorEl] = React.useState(null);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMainMenu = (event) => {
        setMainMenuAnchorEl(event.currentTarget);
    };

    const handleUserMenu = (event) => {
        setUserMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMainMenuAnchorEl(null);
        setUserMenuAnchorEl(null);
    };

    const handleMenuItemClick = (route) => {
        navigate(route);
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar sx={{ bgcolor: '#041E42' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMainMenu}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={mainMenuAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(mainMenuAnchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleMenuItemClick('/')}>Panel de métricas</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('/admin')}>Respuestas de actividades y Usuario</MenuItem>
                    </Menu>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexGrow: 1,
                        height: '100%',
                    }}>
                        <img
                            src={process.env.PUBLIC_URL + '/sel4c-logo-white.png'}
                            alt="SEL4C Logo"
                            style={{ height: '4rem' }}
                        />
                    </Box>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleUserMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={userMenuAnchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(userMenuAnchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
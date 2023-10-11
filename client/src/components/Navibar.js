import React from 'react';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export function Navibar({ isAuthenticated, onLogout }) {
    const [mainMenuAnchorEl, setMainMenuAnchorEl] = React.useState(null);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = React.useState(null);
    const navigate = useNavigate();

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
        if (typeof route === 'function') {
            onLogout();
        } else {
            navigate(route);
        }
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        <MenuItem onClick={() => handleMenuItemClick('/admin')}>Usuarios y respuestas de actividades</MenuItem>
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
                    {isAuthenticated && (
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
                                <MenuItem onClick={() => handleMenuItemClick(onLogout)}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
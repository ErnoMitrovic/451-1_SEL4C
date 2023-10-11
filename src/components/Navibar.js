import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Drawer, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

export function Navibar({ isAuthenticated, onLogout }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Added state for the drawer
    const navigate = useNavigate();

    const handleMenuItemClick = (routeOrAction) => {
        if (typeof routeOrAction === 'function') {
            routeOrAction(); // Call the action (e.g., onLogout)
        } else {
            navigate(routeOrAction); // Navigate to the specified route
        }
        closeDrawer(); // Close the drawer
    };

    // Function to open the drawer
    const openDrawer = () => {
        setIsDrawerOpen(true);
    };

    // Function to close the drawer
    const closeDrawer = () => {
        setIsDrawerOpen(false);
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
                        onClick={openDrawer} // Open the drawer when clicked
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={closeDrawer} // Close the drawer when needed
                    >
                        {isAuthenticated && (
                            <div>
                                {/* Global and individual metrics; data table view */}
                                <MenuItem onClick={() => handleMenuItemClick('/')}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/')}
                                        color="inherit"
                                    >
                                        <PublicIcon />
                                    </IconButton>
                                    <Stack direction="column" spacing={0}>
                                        <Typography variant="body2">Métricas</Typography>
                                        <Typography variant="body2">globales</Typography>
                                    </Stack>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/single')}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/single')}
                                        color="inherit"
                                    >
                                        <TravelExploreIcon />
                                    </IconButton>
                                    <Stack direction="column" spacing={0}>
                                        <Typography variant="body2">Métricas</Typography>
                                        <Typography variant="body2">individuales</Typography>
                                    </Stack>
                                </MenuItem>
                                <MenuItem onClick={() => handleMenuItemClick('/tables')}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/tables')}
                                        color="inherit"
                                    >
                                        <TableChartOutlinedIcon />
                                    </IconButton>
                                    <Stack direction="column" spacing={0}>
                                        <Typography variant="body2">Vista de</Typography>
                                        <Typography variant="body2">tablas</Typography>
                                    </Stack>
                                </MenuItem>
                                <Divider />
                                {/* Admin view for managing administrators */}
                                <MenuItem onClick={() => handleMenuItemClick('/admin')}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/admin')}
                                        color="inherit"
                                    >
                                        <ManageAccountsIcon />
                                    </IconButton>
                                    <Stack direction="column" spacing={0}>
                                        <Typography variant="body2">Administrar</Typography>
                                        <Typography variant="body2">investigadores</Typography>
                                    </Stack>
                                </MenuItem>
                                {/* Profile view to read and update user properties */}
                                <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/profile')}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Typography variant="body2">Mi perfil</Typography>
                                </MenuItem>
                                <Divider />
                                {/* Logout */}
                                <MenuItem onClick={() => handleMenuItemClick(onLogout)}>
                                    <IconButton
                                        size="large"
                                        aria-label="logout"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick(onLogout)}
                                        color="inherit"
                                    >
                                        <LogoutIcon />
                                    </IconButton>
                                    <Typography variant="body2">Cerrar sesión</Typography>
                                </MenuItem>
                            </div>
                        )} {!isAuthenticated && (
                            <div>
                                {/* Login view; default when not authenticated */}
                                <MenuItem onClick={() => handleMenuItemClick('/login')}>
                                    <IconButton
                                        size="large"
                                        aria-label="login"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={() => handleMenuItemClick('/login')}
                                        color="inherit"
                                    >
                                        <LoginIcon />
                                    </IconButton>
                                </MenuItem>
                            </div>
                        )}
                    </Drawer>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}

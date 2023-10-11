import React from "react";
import { Box, Typography, Button, Modal, Grid, FormControl, InputLabel, Input, FormHelperText, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorModal from "../ErrorModal";
import axios from "axios";
import { getToken } from "../../models/token";

const styleModalAdmin = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.5,
    bgcolor: 'white',
    border: '0.25rem solid #D9D9D9',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
};

const styleModalChild = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1rem',
};

export default function AdminModal({ onSuccess, usersData }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const handleOpenSuccess = () => setOpenSuccess(true);
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
        handleClose();
    }

    const [openError, setOpenError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('Error');
    const handleOpenError = () => setOpenError(true);
    const handleCloseError = () => setOpenError(false);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const isEmailValid = () => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const displayHelperTextEmail = () => {
        if (email && !isEmailValid()) {
            return 'Invalid email address';
        }
        return '';
    };

    const arePasswordsMatching = () => {
        return password === passwordConfirm;
    };

    const displayHelperTextPassword = () => {
        if (password && passwordConfirm && !arePasswordsMatching()) {
            return 'Passwords do not match';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!isEmailValid() || !arePasswordsMatching() || password.length < 5) {
            return;
        }

        // Check if email is already in use
        if (usersData.some(user => user.email === email)) {
            setErrorMessage('Ese correo ya está en uso.');
            handleOpenError();
            return;
        }

        const requestData = {
            email: email,
            password: password,
            name: name
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getToken()}`
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/sel4c/user/admin/create/`,
                requestData,
                { headers: headers }
            );

            // Handle success, show a success message and close the modal
            console.log('Successfull request:');

            // Clear the form
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            // Close the modal after a successful request
            handleOpenSuccess();
            // Pass the new user's data to the callback
            if (typeof onSuccess === "function") {
                const modifiedData = {
                    ...response.data, // Copy the existing data
                    "is_active": true, // Add the new field
                };
                onSuccess(modifiedData);
            }
        } catch (error) {
            // Handle errors, delete on production?
            console.error('Error:', error);
            setErrorMessage('Lo sentimos, ha ocurrido un error al crear el investigador.')
            handleOpenError();
        }
    };

    return (
        <div>
            <Button variant="contained" color="success" onClick={handleOpen}>Añadir Investigador</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalAdmin}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            top: '0.3rem',
                            right: '1rem',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" align="center">Añadir Investigador</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="name">Nombre</InputLabel>
                                    <Input
                                        id="name"
                                        aria-describedby="name-helper-text"
                                        type='text'
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="email">Correo</InputLabel>
                                    <Input
                                        id="email"
                                        aria-describedby="email-helper-text"
                                        type='text'
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <FormHelperText id="email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="pass">Contraseña</InputLabel>
                                    <Input
                                        id="pass"
                                        aria-describedby="pass-helper-text"
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FormHelperText id="pass-helper-text">{displayHelperTextPassword()}</FormHelperText>
                                    {password.length > 0 && password.length < 5 && (
                                        <FormHelperText error>La contraseña debe tener al menos 5 caracteres.</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="c-pass">Confirmar Contraseña</InputLabel>
                                    <Input
                                        id="c-pass"
                                        aria-describedby="c-pass-helper-text"
                                        type='password'
                                        value={passwordConfirm}
                                        onChange={(e) => setPasswordConfirm(e.target.value)}
                                    />
                                    <FormHelperText id="c-pass-helper-text">{displayHelperTextPassword()}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="success" type="submit">Añadir</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>


            {/* Modals for success and error messages*/}
            <Modal
                open={openSuccess}
                onClose={handleCloseSuccess}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...styleModalChild }}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    handleCloseSuccess();
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        autoFocus={false}
                    >
                        ¡Investigador creado exitosamente!
                    </Alert>
                </Box>
            </Modal>

            <ErrorModal  openError={openError} handleCloseError={handleCloseError} errorMessage={errorMessage} />
        </div >
    );
}

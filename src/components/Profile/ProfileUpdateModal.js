import React from "react";
import { Box, Typography, Button, Modal, Grid, FormControl, InputLabel, Input, FormHelperText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

export default function ProfileUpdateModal({ onSuccess }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    function handleClose() {
        setName('');
        setEmail('');
        setConfirmEmail('');
        setOpen(false);
    };

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [confirmEmail, setConfirmEmail] = React.useState('');

    const isEmailValid = () => {
        // Regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const displayHelperTextEmail = () => {
        if (email && !isEmailValid()) {
            return 'Dirección de correo electrónico inválida';
        } else if (email && confirmEmail && email !== confirmEmail) {
            return 'Los correos electrónicos no coinciden';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let requestData = {};
        if (!name && email) {

            // Validate email and password
            if (!isEmailValid()) {
                return;
            } else if (email !== confirmEmail) {
                return;
            }

            requestData = {
                email: email
            };

        } else if (name && !email) {
            requestData = {
                name: name
            };
        } else if (name && email) {

            requestData = {
                email: email,
                name: name
            };
        } else {
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getToken()}`
        };

        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/sel4c/user/me/`,
                requestData,
                { headers: headers }
            );

            // Clear the form
            setName('');
            setEmail('');
            // Close the modal after a successful request
            handleClose();
            // Pass the new user's data to the callback
            if (typeof onSuccess === "function") {
                onSuccess(response.data);
            }
        } catch (error) {
            // Handle errors, delete on production?
            console.error('Error:', error);
            alert('Error al actualizar la información');
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>ACTUALIZAR INFORMACIÓN</Button>
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
                                <Typography variant="h5" align="center">Actualiza tu información</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="name">Nombre</InputLabel>
                                    <Input
                                        id="name"
                                        aria-describedby="name-helper-text"
                                        type='text'
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <FormHelperText id="email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="confirm-email">Confirmar Correo</InputLabel>
                                    <Input
                                        id="confirm-email"
                                        aria-describedby="confirm-email-helper-text"
                                        type='text'
                                        value={confirmEmail}
                                        onChange={(e) => setConfirmEmail(e.target.value)}
                                    />
                                    <FormHelperText id="confirm-email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" color="success" type="submit">Actualizar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

import { Box, FormControl, FormHelperText, Stack, Typography, InputLabel, Input, Button, Alert } from "@mui/material"
import React, { useEffect } from "react";
import { Sel4cCard } from "../../components/Sel4cCard";
import { resetPasswordConfirm, checkToken } from "../../models/passwords";
import GenericModalAlert from "../../components/GenericModalAlert";

export default function ForgetPasswordConfirm() {

    const token = new URLSearchParams(window.location.search).get('token');
    const [validToken, setValidToken] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [errorConfirm, setErrorConfirm] = React.useState('');

    // To handle modal alert severity and open state
    const [modalAlertSeverity, setModalAlertSeverity] = React.useState('success');
    const [modalAlertOpen, setModalAlertOpen] = React.useState(false);
    const [modalAlertMessage, setModalAlertMessage] = React.useState('');

    // Validate new passwords according to the following rules:
    // - Your password can’t be too similar to your other personal information.
    // - Your password must contain at least 8 characters.
    // - Your password can’t be a commonly used password.
    // - Your password can’t be entirely numeric.
    function validatePassword() {
        if (newPassword.length < 8) {
            setError('Tu contraseña es muy corta');
        } else if (!isNaN(newPassword)) {
            setError('Tu contraseña no puede ser solo numérica');
        }
        else if (confirmNewPassword !== newPassword) {
            setErrorConfirm('Las contraseñas no coinciden');
        }
        else {
            setError('');
            setErrorConfirm('');
        }
    }

    const validateToken = React.useCallback(() => {
        checkToken(token).then((_) => {
            setValidToken(true);
        }
        ).catch((_) => {
            setValidToken(false);
        })
    }, [token])

    useEffect(validateToken, [token, validateToken])

    useEffect(validatePassword, [error, newPassword, confirmNewPassword])


    function handleSubmit(event) {
        event.preventDefault();
        if (error === '' && errorConfirm === '') {
            resetPasswordConfirm(token, confirmNewPassword).then((response) => {
                console.log(response.data);
                setModalAlertOpen(true);
                setModalAlertSeverity('success');
                setModalAlertMessage('Contraseña actualizada correctamente');
            }).catch((error) => {
                console.log(error.response.data.message)
                setModalAlertOpen(true);
                setModalAlertSeverity('error');
                setModalAlertMessage('Error al actualizar contraseña: ' + error.response.data.message);
            })
        }
    }

    return (
        <>
            {!validToken ?
                (<Box display='flex' justifyContent='center'>
                    <Alert
                        severity="error"
                        onClose={() => window.location.href = '/login'}
                        onClick={() => window.location.href = '/login'}
                        sx={{ width: 0.8 }}>
                        ¡El token no es válido! Cierra el mensaje para redigirigir
                    </Alert>
                </Box>) :
                <Sel4cCard direction='column'>
                    <Typography variant="h2" gutterBottom mt={2}>
                        Cambiar contraseña
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Ingresa tu contraseña actual y tu nueva contraseña
                    </Typography>
                    <Stack
                        component='form'
                        textAlign='center'
                        margin={3}
                        width={0.8}
                        minWidth='xs'
                        spacing={1}
                        alignItems='center'
                        onSubmit={handleSubmit}>
                        <FormControl
                            required
                            error={error !== ''}
                            fullWidth>
                            <InputLabel htmlFor="new">Nueva contraseña</InputLabel>
                            <Input id="new" aria-describedby="new-helper"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                type="password" />
                            <FormHelperText>
                                {error}
                                <br />
                                Tu contraseña no puede ser igual a la anterior
                                <br />
                                Tu contraseña debe tener al menos 8 caracteres
                                <br />
                                Tu contraseña no puede ser solo numérica
                                <br />
                            </FormHelperText>
                        </FormControl>
                        <FormControl required fullWidth >
                            <InputLabel htmlFor="confirm">Confirm new password</InputLabel>
                            <Input id="confirm" aria-describedby="confirm"
                                value={confirmNewPassword}
                                onChange={(event) => setConfirmNewPassword(event.target.value)}
                                error={errorConfirm !== ''}
                                type="password" />
                            <FormHelperText>{errorConfirm}</FormHelperText>
                        </FormControl>
                        <Button type="submit" variant="contained">Cambiar contraseña</Button>
                    </Stack>
                    <GenericModalAlert severity={modalAlertSeverity} open={Boolean(modalAlertOpen)} message={modalAlertMessage} handleClose={()=> window.location.href='/login'} />
                </Sel4cCard>
            }
        </>
    )
}
import { FormControl, FormHelperText, Stack, Typography, InputLabel, Input, Button, Alert } from "@mui/material"
import React, { useEffect } from "react";
import { Sel4cCard } from "../../components/Sel4cCard";
import { changePassword } from "../../models/passwords";

export function ChangePassword() {

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [errorConfirm, setErrorConfirm] = React.useState('');

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
        } else if (newPassword === oldPassword) {
            setError('Tu contraseña no puede ser igual a la anterior');
        }
        else {
            setError('');
        }
    }
    
    useEffect(validatePassword, [oldPassword, error, newPassword])
    useEffect(() => {
        if(confirmNewPassword !== newPassword) {
            setErrorConfirm('Las contraseñas no coinciden');
        } else {
            setErrorConfirm('');
        }
    }, [confirmNewPassword, newPassword])

    function handleSubmit(event){
        event.preventDefault();
        if(!error && !errorConfirm) {
            changePassword(oldPassword, newPassword).then((_) => {
                console.log("Contraseña actualizada")
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
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
                <FormControl required fullWidth>
                    <InputLabel htmlFor="current">Contraseña actual</InputLabel>
                    <Input id="current" aria-describedby="current-helper" 
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    type="password"/>
                </FormControl>
                <FormControl 
                required
                error={error}
                fullWidth>
                    <InputLabel htmlFor="new">Nueva contraseña</InputLabel>
                    <Input id="new" aria-describedby="new-helper" 
                    value={newPassword} 
                    onChange={(event) => setNewPassword(event.target.value)} 
                    type="password"/>
                    <FormHelperText>
                    {error}
                    <br/>
                    Tu contraseña no puede ser igual a la anterior
                    <br/>
                    Tu contraseña debe tener al menos 8 caracteres
                    <br/>
                    Tu contraseña no puede ser solo numérica
                    <br/>
                    </FormHelperText>
                </FormControl>
                <FormControl required fullWidth >
                    <InputLabel htmlFor="confirm">Confirm new password</InputLabel>
                    <Input id="confirm" aria-describedby="confirm" 
                    value={confirmNewPassword}
                    onChange={(event) => setConfirmNewPassword(event.target.value)}
                    error={errorConfirm} 
                    type="password"/>
                    <FormHelperText>{errorConfirm}</FormHelperText>
                </FormControl>
                <Button type="submit" variant="contained">Cambiar contraseña</Button>
            </Stack>
        </Sel4cCard>
    )
}
import { Typography, Stack, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { Sel4cCard } from "../../components/Sel4cCard";
import React from "react";
import { Navigate } from "react-router-dom";
import SuccessModal from "../../components/SuccessModal";

export default function ForgetPasswordSendEmail() {

    // Confirmation modal
    const [open, setOpen] = React.useState(false);
    // Track email
    const [email, setEmail] = React.useState('');
    // Check error
    const emailError = () => {
        if (!email) return true;
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return !re.test(email);
    }
    // Helper text feedback
    const displayHelperTextEmail = () => {
        if (!email) return 'Please enter your email';
        else if (emailError(email)) return 'Please enter a valid email';
        return '';
    }

    // Handle submit
    const handleSubmit = (event) => {
        console.log('submit');
        event.preventDefault();
        if (!emailError()) {
            setOpen(true);
        }
    };

    // Handle close modal
    const handleClose = () => {
        setOpen(false);
        <Navigate to='/login' />
    };

    const successMessage = "We have sent you an email with a link to reset your password."

    return (
        <Sel4cCard>
            <SuccessModal openSuccess={open} handleCloseSuccess={handleClose} successMessage={successMessage}/>
            <Stack minWidth='xs' width={0.8} p={3} spacing={2}>
                <Typography variant="h3" textAlign='center' fontWeight='bold'>
                    Reset your password
                </Typography>
                <Typography variant="body1" textAlign='center'>
                    Enter your email address and we will send you a link to reset your password.
                </Typography>
                <Stack component='form' onSubmit={handleSubmit}>
                    <FormControl required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" aria-describedby="email-helper-text" value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={emailError()} />
                        <FormHelperText id="email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained">Send</Button>
                </Stack>
            </Stack>
        </Sel4cCard>
    );
}
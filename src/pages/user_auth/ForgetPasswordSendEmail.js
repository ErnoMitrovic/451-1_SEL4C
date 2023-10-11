import { Typography, Stack, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { Sel4cCard } from "../../components/Sel4cCard";
import React from "react";

export default function ForgetPasswordSendEmail() {

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

    return (
        <Sel4cCard>
            <Stack minWidth='xs' width={0.8} p={3} spacing={2}>
                <Typography variant="h3" textAlign='center' fontWeight='bold'>
                    Reset your password
                </Typography>
                <Typography variant="body1" textAlign='center'>
                    Enter your email address and we will send you a link to reset your password.
                </Typography>
                <Stack component='form'>
                    <FormControl required>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" aria-describedby="email-helper-text" value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={emailError()} />
                        <FormHelperText id="email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                    </FormControl>
                </Stack>
                <Button type="submit" variant="contained">Send</Button>
            </Stack>
        </Sel4cCard>
    );
}
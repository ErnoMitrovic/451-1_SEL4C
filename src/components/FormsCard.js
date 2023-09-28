import { Box, Stack, Typography, Input, FormControl, InputLabel, FormHelperText, Button } from "@mui/material";
import React from "react";

export function FormsCard() {

    // Track email
    const [email, setEmail] = React.useState('');
    // Track password
    const [password, setPassword] = React.useState('');

    const setEmailError = (email) => {
        if (!email) return true;
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return !re.test(email);
    }

    const displayHelperTextEmail = () => {
        if (!email) return 'Please enter your email';
        else if (setEmailError(email)) return 'Please enter a valid email';
        return '';
    }

    const displayhelperTextPassword = () => {
        if (!password) return 'Please enter your password';
        return '';
    }

    // sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Stack spacing={2} maxWidth='md'
                minWidth='xs'
                border={25}
                padding={2}
                borderRadius={10}
                margin={2}
                borderColor='primary.main'
                alignItems='center'>
                <Typography variant="h2" align="center" sx={{ letterSpacing: 6 }} >
                    SEL4C
                </Typography>
                <Typography variant="h4" align="center" sx={{ letterSpacing: 2 }} width='60%' >
                    Social Entrepreneurship Learning 4 Complexity.
                </Typography>
                <Stack width={0.8} spacing={2}>
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            aria-describedby="email-helper-text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={setEmailError(email)}
                        />
                        <FormHelperText id="email-helper-text">{displayHelperTextEmail()}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            aria-describedby="password-helper-text"
                            type='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={!password}
                        />
                        <FormHelperText id="password-helper-text">{displayhelperTextPassword()}</FormHelperText>
                    </FormControl>
                    <Button variant="contained" >Login</Button>
                </Stack>
            </Stack>
        </Box>
    );
}
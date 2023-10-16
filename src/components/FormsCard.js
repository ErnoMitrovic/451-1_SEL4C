import { Stack, Typography, Input, FormControl, InputLabel, FormHelperText, Button } from "@mui/material";
import React from "react";
import { Sel4cCard } from "./Sel4cCard";
import { createToken, isAdmin } from "../models/token";
import Cookies from 'universal-cookie';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from "./ErrorModal";

export function FormsCard({ onLogin }) {
    const navigate = useNavigate();

    // Track email
    const [email, setEmail] = React.useState('');
    // Track password
    const [password, setPassword] = React.useState('');
    // Error feedback
    const [openError, setOpenError] = React.useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = React.useState('');

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

    // If email is valid and password is not empty, then login
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!setEmailError(email) && password) {
            // Login
            await createToken(email, password)
                .then(async (response) => {
                    const cookies = new Cookies();
                    const token = response.data.token
                    cookies.set('token', token, { path: '/' });
                    // Check if user is admin, if so, navigate to home page
                    // else, display error message
                    if (await isAdmin() === true) {
                        onLogin();
                        navigate('/');
                    } else {
                        cookies.remove('token');
                        setErrorMessage('Usuario o contraseña incorrectos');
                        setOpenError(true);
                    }
                })
                .catch((error) => {
                    setErrorMessage('Usuario o contraseña incorrectos');
                    setOpenError(true);
                });
        }
    }

    return (
        <Sel4cCard>
            <Stack spacing={2} maxWidth='md'
                m={2}
                minWidth='xs'
                alignItems='center'>
                <Typography variant="h2" align="center" sx={{ letterSpacing: 6 }} >
                    SEL4C
                </Typography>
                <Typography variant="h4" align="center" sx={{ letterSpacing: 2 }} >
                    Social Entrepreneurship Learning 4 Complexity.
                </Typography>
                <Stack component='form' width={0.7} spacing={2} alignItems='center' onSubmit={handleLogin}>
                    <FormControl fullWidth>
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
                    <FormControl fullWidth>
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
                        <Link to='/forgetPassword'>
                            <Typography textAlign='right'>Forgot your password?</Typography>
                        </Link>
                    </FormControl>
                    <Button type="submit" variant="contained">Login</Button>
                </Stack>
            </Stack>
            <ErrorModal openError={openError} handleCloseError={handleCloseError} errorMessage={errorMessage}/>
        </Sel4cCard>
    );
}

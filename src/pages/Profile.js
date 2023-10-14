import './Profile.sass'
import React from "react";
import Box from '@mui/material/Box';
import ProfileUpdateModal from '../components/Profile/ProfileUpdateModal';
import { getMe } from "../models/users";
import ErrorModal from '../components/ErrorModal';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    // Track user data
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    // Error feedback
    const [openError, setOpenError] = React.useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const meData = await getMe();
                setName(meData.name);
                setEmail(meData.email);
            } catch (error) {
                // Handle errors, e.g., show an error message
                setErrorMessage('Error al cargar datos');
                setOpenError(true);
            }
        };

        fetchData();
    }, []);

    const handleUserDataUpdateSuccess = (userData) => {
        setName(userData.name);
        setEmail(userData.email);
    }


    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexGrow: 1,
                margin: '2rem 0',
            }}>
                <p className='title'>Información del perfil</p>
                <div className="info">
                    <span className="label">Correo electrónico:</span> {email}
                </div>
                <div className="info">
                    <span className="label">Nombre:</span> {name}
                </div>
                <div>
                    <ProfileUpdateModal onSuccess={handleUserDataUpdateSuccess} />
                </div>
                <Button variant='contained' sx={{marginTop: 2}} onClick={
                    () => {
                        navigate('/change-password')
                    }
                } >
                    Cambiar contraseña
                </Button>
            </Box>
            <ErrorModal open={openError} handleClose={handleCloseError} errorMessage={errorMessage} />
        </div>
    );
}

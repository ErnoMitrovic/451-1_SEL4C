import './Profile.sass'
import React from "react";
import Box from '@mui/material/Box';

export default function Profile() {
    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexGrow: 1,
                margin: '2rem 0'
            }}>
                <p className='title'>Esta es la página de profile</p>
                <div className="info">
                    <span className="label">Correo electrónico:</span> user@example.com
                </div>
                <div className="info">
                    <span className="label">Nombre:</span> string
                </div>
            </Box>
        </div>
    );
}

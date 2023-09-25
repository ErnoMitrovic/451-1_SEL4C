import './Profile.sass'
import React from "react";
import { Navibar } from "../components/Navibar";
import Box from '@mui/material/Box';

export default function Profile() {
    return (
        <div>
            <Navibar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                flexGrow: 1,
                margin: '2rem 0'
            }}>
                <p class='title'>Esta es la página de profile</p>
                <div class="info">
                    <span class="label">Correo electrónico:</span> user@example.com
                </div>
                <div class="info">
                    <span class="label">Nombre:</span> string
                </div>
            </Box>
        </div>
    );
}

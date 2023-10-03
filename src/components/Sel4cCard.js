import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// sx={{ bgcolor: 'white', height: '30rem', border: '1rem solid', borderColor: '#D9D9D9', borderRadius: '2rem'}}
export function Sel4cCard(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" >
                <Box sx={{
                    display: 'flex',
                    flexDirection: props.direction || 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                    margin: '2rem 0',
                    bgcolor: 'white',
                    border: '1rem solid',
                    borderColor: '#D9D9D9',
                    borderRadius: '2rem',
                    boxSizing: 'border-box'
                }}>
                    {props.children}
                </Box>
            </Container>
        </React.Fragment>
    );
}
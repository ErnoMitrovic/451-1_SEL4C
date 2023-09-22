import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export function Sel4cCard(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <br /><br /><br />
        <Box sx={{ bgcolor: 'white', height: '30rem', border: '1rem solid', borderColor: '#D9D9D9', borderRadius: '2rem'}}>
            {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
}